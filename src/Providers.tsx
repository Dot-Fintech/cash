import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { client } from './config/apollo';
import UserContextProvider from './context/user/provider';
import { linking } from './linking';
import { ThemeProvider } from './theme';

const Providers: React.FC = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <UserContextProvider>
          <NavigationContainer linking={linking}>
            {children}
          </NavigationContainer>
        </UserContextProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default Providers;
