import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Overlay from '../../components/Overlay';
import {
  HomeStackParamList,
  HomeStackScreenConfigs,
  HomeStackScreenNames,
} from '../utils/screenConfigs/HomeStack';

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack: React.FC = () => {
  return (
    <Overlay>
      <Stack.Navigator>
        {HomeStackScreenNames.map((name) => (
          <Stack.Screen
            key={name}
            name={name}
            {...HomeStackScreenConfigs[name]}
          />
        ))}
      </Stack.Navigator>
    </Overlay>
  );
};

export default HomeStack;
