import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Overlay from '../../components/Overlay';
import {
  RootStackParamList,
  RootStackScreenConfigs,
  RootStackScreenNames,
} from '../utils/screenConfigs/RootStack';

const Stack = createStackNavigator<RootStackParamList>();

const RootStack: React.FC = () => {
  return (
    <Overlay>
      <Stack.Navigator>
        {RootStackScreenNames.map((name) => (
          <Stack.Screen
            key={name}
            name={name}
            {...RootStackScreenConfigs[name]}
          />
        ))}
      </Stack.Navigator>
    </Overlay>
  );
};

export default RootStack;
