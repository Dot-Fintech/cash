import './jsencrypt.min.js';

import { StatusBar } from 'expo-status-bar';
import React from 'react';

import RootStack from './src/navigation/RootStack';
import Providers from './src/Providers';

const App: React.FC = () => {
  return (
    <Providers>
      <StatusBar style="auto" />
      <RootStack />
    </Providers>
  );
};

export default App;
