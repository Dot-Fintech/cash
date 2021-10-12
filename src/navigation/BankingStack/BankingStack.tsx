import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Overlay from '../../components/Overlay';
import Banking from '../../screens/Banking';
import { TransactionWithCard } from '../../screens/Transaction';
import { SCREENS } from '../utils/enums/screens';
import { BankingStackParamList } from '../utils/paramLists/BankingStack';

const Stack = createStackNavigator<BankingStackParamList>();

const BankingStack: React.FC = () => {
  return (
    <Overlay>
      <Stack.Navigator>
        <Stack.Screen
          component={Banking}
          name={SCREENS.BANKING}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={TransactionWithCard}
          name={SCREENS.TRANSACTION_WITH_CARD}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </Overlay>
  );
};

export default BankingStack;
