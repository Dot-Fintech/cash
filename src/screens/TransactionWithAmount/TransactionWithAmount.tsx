import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Button, Text } from 'react-native';

import Screen from '../../components/Screen';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { MoneyStackParamList } from '../../navigation/utils/screenConfigs/MoneyStack';

const TransactionWithAmount: React.FC = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<MoneyStackParamList, SCREENS.TRANSACTION_WITH_AMOUNT>
    >();

  const goToMoney = () => navigation.pop();

  return (
    <Screen>
      <Text>Transaction with amount</Text>
      <Button title="Money" onPress={goToMoney} />
    </Screen>
  );
};

export default TransactionWithAmount;
