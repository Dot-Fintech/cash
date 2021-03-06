import ActionTypes, { Action } from './actions';
import type { State } from './state';
import { initialState } from './state';

export default (state = initialState, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
