import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Overlay from '../../components/Overlay';
import Money from '../../screens/Money';
import TransactionWithAmount from '../../screens/TransactionWithAmount';
import { SCREENS } from '../utils/enums/screens';
import { MoneyStackParamList } from '../utils/paramLists/MoneyStack';

const Stack = createStackNavigator<MoneyStackParamList>();

const MoneyStack: React.FC = () => {
  return (
    <Overlay>
      <Stack.Navigator>
        <Stack.Screen component={Money} name={SCREENS.MONEY} />
        <Stack.Screen
          component={TransactionWithAmount}
          name={SCREENS.TRANSACTION_WITH_AMOUNT}
        />
      </Stack.Navigator>
    </Overlay>
  );
};

export default MoneyStack;
