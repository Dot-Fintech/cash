import { Color, Theme } from '../../theme';

type AnimationColors = {
  primary: Color;
  secondary: Color;
};

export const getAnimationColors = (theme: Theme): AnimationColors => {
  const color = theme.colors.background.secondary;
  switch (theme.name) {
    default:
    case 'light':
      return {
        primary: new Color({ r: color.r - 5, g: color.g - 5, b: color.b - 5 }),
        secondary: new Color({
          r: color.r - 10,
          g: color.g - 10,
          b: color.b - 10,
        }),
      };
    case 'dark':
      return {
        primary: new Color({
          r: color.r + 30,
          g: color.g + 30,
          b: color.b + 30,
        }),
        secondary: new Color({
          r: color.r + 35,
          g: color.g + 35,
          b: color.b + 35,
        }),
      };
  }
};
