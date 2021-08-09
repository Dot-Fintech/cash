import './jsencrypt.min.js';

import { Raleway_400Regular } from '@expo-google-fonts/raleway';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';
import { SourceSansPro_400Regular } from '@expo-google-fonts/source-sans-pro';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useEffect } from 'react';

import RootStack from './src/navigation/RootStack';
import Providers from './src/Providers';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Roboto_400Regular,
    SourceSansPro_400Regular,
  });

  useEffect(() => {
    (async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP,
      );
    })();
  }, []);

  return fontsLoaded ? (
    <Providers>
      <StatusBar style="auto" />
      <RootStack />
    </Providers>
  ) : (
    <AppLoading />
  );
};

export default App;
