import { ApolloProvider } from '@apollo/client';
import React from 'react';

import { client } from './config/apollo';
import UserContextProvider from './context/user/provider';
import { ThemeProvider } from './theme';

const Providers: React.FC = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <UserContextProvider>{children}</UserContextProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default Providers;
