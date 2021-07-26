import './jsencrypt.min.js';

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';

import Providers from './src/Providers';

const App: React.FC = () => {
  return (
    <Providers>
      <View>
        <StatusBar style="auto" />
        <Text>Hello there. How are you?</Text>
      </View>
    </Providers>
  );
};

export default App;
