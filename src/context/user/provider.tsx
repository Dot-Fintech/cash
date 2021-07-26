import React, { useReducer } from 'react';

import type { FullUserFragment } from '../../generated/graphql';
import ActionTypes from './actions';
import Reducer from './reducer';
import { initialState, UserContext } from './state';

const Provider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const setUser = (user?: FullUserFragment) =>
    dispatch({ type: ActionTypes.SET_USER, payload: user });

  return (
    <UserContext.Provider
      value={{
        ...state,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default Provider;
