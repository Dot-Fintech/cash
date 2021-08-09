import type { ThemeColors } from './colors';
import type { ThemeTypography } from './typography';

export type ThemeName = 'light' | 'dark';
export type ThemePreference = 'automatic' | 'manual';

export type Theme = {
  name: ThemeName;
  colors: ThemeColors;
  typography: ThemeTypography;
};
