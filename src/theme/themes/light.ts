import { Color } from '../colors';
import { Theme } from '../types';
import { typography } from '../typography';

export const LightTheme: Theme = {
  name: 'light',
  colors: {
    background: {
      primary: new Color({ r: 255, g: 255, b: 255 }),
      secondary: new Color({ r: 245, g: 245, b: 245 }),
    },
    main: {
      primary: new Color({ r: 0, g: 210, b: 210 }),
      secondary: new Color({ r: 18, g: 137, b: 167 }),
    },
    text: {
      primary: new Color({ r: 0, g: 0, b: 0 }),
      secondary: new Color({ r: 50, g: 50, b: 50 }),
    },
    textLink: {
      primary: new Color({ r: 0, g: 82, b: 204 }),
      secondary: new Color({ r: 0, g: 82, b: 204 }),
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
