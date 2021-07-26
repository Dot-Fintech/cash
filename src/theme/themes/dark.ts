import { Color } from '../colors';
import { Theme } from '../types';
import { typography } from '../typography';

export const DarkTheme: Theme = {
  name: 'dark',
  colors: {
    background: {
      primary: new Color({ r: 0, g: 0, b: 0 }),
      secondary: new Color({ r: 35, g: 35, b: 35 }),
    },
    main: {
      primary: new Color({ r: 18, g: 137, b: 167 }),
      secondary: new Color({ r: 0, g: 210, b: 210 }),
    },
    text: {
      primary: new Color({ r: 255, g: 255, b: 255 }),
      secondary: new Color({ r: 205, g: 205, b: 205 }),
    },
    textLink: {
      primary: new Color({ r: 255, g: 255, b: 255 }),
      secondary: new Color({ r: 23, g: 43, b: 77 }),
    },
    success: {
      primary: new Color({ r: 46, g: 204, b: 113 }),
      secondary: new Color({ r: 39, g: 174, b: 96 }),
    },
    warning: {
      primary: new Color({ r: 254, g: 202, b: 87 }),
      secondary: new Color({ r: 255, g: 159, b: 67 }),
    },
    error: {
      primary: new Color({ r: 231, g: 76, b: 60 }),
      secondary: new Color({ r: 192, g: 57, b: 43 }),
    },
  },
  typography,
};
