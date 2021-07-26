import { createContext } from 'react';

import type { FullUserFragment } from '../../generated/graphql';

export type State = {
  user?: FullUserFragment;
  setUser: (user?: FullUserFragment) => void;
};

export const initialState: State = {
  setUser: (user?: FullUserFragment) => {
    void user;
  },
};

export const UserContext = createContext(initialState);
