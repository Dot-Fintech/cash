import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Overlay from '../../components/Overlay';
import Home from '../../screens/Home';
import { TransactionWithUser } from '../../screens/Transaction';
import TransactionSummary from '../../screens/TransactionSummary';
import UserSummary from '../../screens/UserSummary';
import { SCREENS } from '../utils/enums/screens';
import { HomeStackParamList } from '../utils/paramLists/HomeStack';

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack: React.FC = () => {
  return (
    <Overlay>
      <Stack.Navigator>
        <Stack.Screen
          component={Home}
          name={SCREENS.HOME}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={TransactionSummary}
          name={SCREENS.TRANSACTION_SUMMARY}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={UserSummary}
          name={SCREENS.USER_SUMMARY}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={TransactionWithUser}
          name={SCREENS.TRANSACTION_WITH_USER}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </Overlay>
  );
};

export default HomeStack;
