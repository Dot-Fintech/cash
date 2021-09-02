import { Color, Colors, Theme } from '../../theme';
import type { SlideSelectVariant } from './types';

export const getOptionContainerColor = (
  theme: Theme,
  variant?: SlideSelectVariant,
  isSelected?: boolean,
): Color => {
  switch (variant) {
    case 'color':
      return isSelected
        ? theme.colors.main.secondary
        : theme.name === 'light'
        ? Colors.white
        : Colors.black;
    case 'dark':
      return isSelected
        ? Colors.black
        : new Color({ ...Colors.black, opacity: 0.1 });
    case 'translucent':
      return isSelected
        ? new Color({ ...Colors.black, opacity: 0.2 })
        : new Color({ ...Colors.black, opacity: 0.1 });
    case 'light':
    default:
      return isSelected
        ? theme.colors.background.secondary
        : theme.colors.background.primary;
  }
};

export const getOptionTextColor = (
  theme: Theme,
  variant?: SlideSelectVariant,
  isSelected?: boolean,
): Color => {
  switch (variant) {
    case 'color':
      return isSelected
        ? theme.name === 'light'
          ? Colors.white
          : Colors.black
        : new Color({ ...theme.colors.main.primary, opacity: 0.75 });
    case 'dark':
      return isSelected ? theme.colors.main.primary : Colors.black;
    case 'translucent':
      return Colors.white;
    case 'light':
    default:
      return isSelected ? theme.colors.text.primary : theme.colors.main.primary;
  }
};
