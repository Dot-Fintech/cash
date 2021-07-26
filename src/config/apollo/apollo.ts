import {
  ApolloClient,
  createHttpLink,
  from,
  fromPromise,
  InMemoryCache,
  NextLink,
  Observable,
  Operation,
  ServerError,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import axios from 'axios';
import publicIp from 'public-ip';

import TokenStore from '../../stores/TokenStore';
import { mergeInteractions } from './cache/interactions';
import { mergeNotifications } from './cache/notifications';
import { mergeTransactions } from './cache/transactions';

let clientIp: string | undefined;
(async () => {
  clientIp = await publicIp.v4();
})();

const getNewAccessToken = async () => {
  const { getRefreshToken, setTokens } = TokenStore;
  const refreshToken = await getRefreshToken();
  try {
    if (!refreshToken) return;
    const accessTokenResponse = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/auth/generate-token`,
      { params: { refreshToken } },
    );
    return accessTokenResponse.data;
  } catch (error) {
    setTokens();
    // TODO: if we can't get the new tokens, we should log the user out
  }
};

const retryOperation = (operation: Operation, forward: NextLink) =>
  fromPromise(getNewAccessToken()).flatMap((accessToken) => {
    if (accessToken) {
      TokenStore.setAccessToken(accessToken);
      operation.setContext({
        headers: {
          ...operation.getContext().headers,
          authorization: `Bearer ${accessToken}`,
        },
      });
      return forward(operation);
    }
    return Observable.of({});
  });

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (networkError && (networkError as ServerError).statusCode === 401) {
      return retryOperation(operation, forward);
    } else if (graphQLErrors) {
      for (const err of graphQLErrors) {
        switch (err.extensions?.code) {
          case 'UNAUTHENTICATED':
            return retryOperation(operation, forward);
        }
      }
    }
  },
);

const authLink = setContext((_, { headers }) => {
  const { accessToken } = TokenStore;
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
      'client-ip': clientIp,
    },
  };
});

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_SERVER_URL,
});

export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          interactions: {
            keyArgs: false,
            merge: mergeInteractions,
          },
          notifications: {
            keyArgs: false,
            merge: mergeNotifications,
          },
          transactions: {
            keyArgs: false,
            merge: mergeTransactions,
          },
        },
      },
    },
  }),
});
