import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useColorScheme } from 'react-native';

import { ThemeName, ThemePreference } from '../types';
import { THEME_KEY, THEME_PREFERENCE_KEY, ThemeContext } from './state';

const Provider: React.FC = ({ children }) => {
  const colorScheme = useColorScheme();

  const [theme, setTheme] = useState<ThemeName>(
    colorScheme ? colorScheme : 'light',
  );
  const [preference, setPreference] = useState<ThemePreference>('automatic');

  useEffect(() => {
    (async () => {
      const storedTheme = (await AsyncStorage.getItem(THEME_KEY)) as ThemeName;
      const storedPreference = (await AsyncStorage.getItem(
        THEME_PREFERENCE_KEY,
      )) as ThemePreference;

      if (storedPreference === 'manual' && theme !== storedTheme) {
        setTheme(storedTheme);
      }
    })();
  }, []);

  const _setTheme = async (theme: ThemeName) => {
    await AsyncStorage.setItem(THEME_KEY, theme);
    setTheme(theme);
  };

  const _setPreference = async (preference: ThemePreference) => {
    await AsyncStorage.setItem(THEME_PREFERENCE_KEY, preference);
    setPreference(preference);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        preference,
        setTheme: _setTheme,
        setPreference: _setPreference,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default Provider;
