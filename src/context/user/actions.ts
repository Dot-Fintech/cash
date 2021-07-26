import type { FullUserFragment } from '../../generated/graphql';

enum ActionTypes {
  SET_USER,
}

type SetUser = {
  type: ActionTypes.SET_USER;
  payload?: FullUserFragment;
};

export type Action = SetUser;

export default ActionTypes;
