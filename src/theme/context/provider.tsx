import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useReducer } from 'react';
import { useColorScheme } from 'react-native';

import { ThemeName } from '../types';
import ActionTypes from './actions';
import Reducer from './reducer';
import { initialState, THEME_KEY, ThemeContext } from './state';

const Provider: React.FC = ({ children }) => {
  const colorScheme = useColorScheme();

  const [state, dispatch] = useReducer(Reducer, {
    ...initialState,
    theme: colorScheme ? colorScheme : 'light',
  });

  const setTheme = async (theme: ThemeName) => {
    await AsyncStorage.setItem(THEME_KEY, theme);
    dispatch({ type: ActionTypes.SET_THEME, payload: theme });
  };

  return (
    <ThemeContext.Provider
      value={{
        ...state,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default Provider;
