import { createContext } from 'react';

import type { ThemeName } from '../types';

export type State = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
};

export const THEME_KEY = 'theme';

export const initialState: State = {
  theme: 'light',
  setTheme: (theme: ThemeName) => {
    void theme;
  },
};

export const ThemeContext = createContext(initialState);
