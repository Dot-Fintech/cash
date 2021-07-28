import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import {
  SignUpStackParamList,
  SignUpStackScreenConfigs,
  SignUpStackScreenNames,
} from '../utils/screenConfigs/SignUpStack';

const Stack = createStackNavigator<SignUpStackParamList>();

const SignUpStack: React.FC = () => {
  return (
    <Stack.Navigator>
      {SignUpStackScreenNames.map((name) => (
        <Stack.Screen
          key={name}
          name={name}
          {...SignUpStackScreenConfigs[name]}
        />
      ))}
    </Stack.Navigator>
  );
};

export default SignUpStack;
