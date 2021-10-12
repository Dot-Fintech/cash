import { Color, Colors, ThemeName } from '../theme';

export const getShadowColor = (theme: ThemeName): string => {
  switch (theme) {
    case 'dark':
      return new Color({ r: 50, g: 50, b: 50, opacity: 1 }).toString();
    case 'light':
      return new Color({ ...Colors.black, opacity: 0.2 }).toString();
  }
};
