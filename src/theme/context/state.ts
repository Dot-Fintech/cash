import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext } from 'react';

import type { ThemeName } from '../types';

export type State = {
  getTheme: () => Promise<ThemeName>;
  setTheme: (theme: ThemeName) => void;
};

export const THEME_KEY = 'theme';

export const initialState: State = {
  getTheme: async () =>
    (await AsyncStorage.getItem(THEME_KEY)) === 'dark' ? 'dark' : 'light',
  setTheme: (theme: ThemeName) => {
    void theme;
  },
};

export const ThemeContext = createContext(initialState);
