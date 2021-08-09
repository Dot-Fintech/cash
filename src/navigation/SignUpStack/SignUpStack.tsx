import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Overlay from '../../components/Overlay';
import {
  SignUpStackParamList,
  SignUpStackScreenConfigs,
  SignUpStackScreenNames,
} from '../utils/screenConfigs/SignUpStack';

const Stack = createStackNavigator<SignUpStackParamList>();

const SignUpStack: React.FC = () => {
  return (
    <Overlay>
      <Stack.Navigator>
        {SignUpStackScreenNames.map((name) => (
          <Stack.Screen
            key={name}
            name={name}
            {...SignUpStackScreenConfigs[name]}
          />
        ))}
      </Stack.Navigator>
    </Overlay>
  );
};

export default SignUpStack;
