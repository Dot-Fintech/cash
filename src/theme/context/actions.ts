import type { ThemeName } from '../../theme/types';

enum ActionTypes {
  SET_THEME,
}

type SetTheme = {
  type: ActionTypes.SET_THEME;
  payload: ThemeName;
};

export type Action = SetTheme;

export default ActionTypes;
