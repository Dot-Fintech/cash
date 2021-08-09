import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Overlay from '../../components/Overlay';
import {
  MoneyStackParamList,
  MoneyStackScreenConfigs,
  MoneyStackScreenNames,
} from '../utils/screenConfigs/MoneyStack';

const Stack = createStackNavigator<MoneyStackParamList>();

const MoneyStack: React.FC = () => {
  return (
    <Overlay>
      <Stack.Navigator>
        {MoneyStackScreenNames.map((name) => (
          <Stack.Screen
            key={name}
            name={name}
            {...MoneyStackScreenConfigs[name]}
          />
        ))}
      </Stack.Navigator>
    </Overlay>
  );
};

export default MoneyStack;
