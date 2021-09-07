import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Overlay from '../../components/Overlay';
import Money from '../../screens/Money';
import { TransactionWithAmount } from '../../screens/Transaction';
import { SCREENS } from '../utils/enums/screens';
import { MoneyStackParamList } from '../utils/paramLists/MoneyStack';

const Stack = createStackNavigator<MoneyStackParamList>();

const MoneyStack: React.FC = () => {
  return (
    <Overlay>
      <Stack.Navigator>
        <Stack.Screen
          component={Money}
          name={SCREENS.MONEY}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={TransactionWithAmount}
          name={SCREENS.TRANSACTION_WITH_AMOUNT}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </Overlay>
  );
};

export default MoneyStack;
