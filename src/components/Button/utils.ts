import { useTheme } from 'styled-components';

import { Color } from '../../theme';

type Result = {
  first: Color;
  second: Color;
};

export const useButtonLinearGradient = (): Result => {
  const theme = useTheme();

  switch (theme.name) {
    case 'light':
      return {
        first: theme.colors.main.secondary,
        second: new Color({
          ...theme.colors.main.secondary,
          g: theme.colors.main.secondary.g + 30,
          b: theme.colors.main.secondary.b + 30,
        }),
      };
    case 'dark':
      return {
        first: theme.colors.main.secondary,
        second: new Color({
          ...theme.colors.main.secondary,
          g: theme.colors.main.secondary.g - 30,
          b: theme.colors.main.secondary.b - 30,
        }),
      };
  }
};
