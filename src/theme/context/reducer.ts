import ActionTypes, { Action } from './actions';
import type { State } from './state';
import { initialState } from './state';

export default (state = initialState, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};
