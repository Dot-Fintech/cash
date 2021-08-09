import { createContext } from 'react';

import type { ThemeName, ThemePreference } from '../types';

export type State = {
  theme: ThemeName;
  preference: ThemePreference;
  setTheme: (theme: ThemeName) => void;
  setPreference: (theme: ThemePreference) => void;
};

export const THEME_KEY = 'theme';
export const THEME_PREFERENCE_KEY = 'theme-preference';

export const initialState: State = {
  theme: 'light',
  preference: 'automatic',
  setTheme: (theme: ThemeName) => {
    void theme;
  },
  setPreference: (preference: ThemePreference) => {
    void preference;
  },
};

export const ThemeContext = createContext(initialState);
