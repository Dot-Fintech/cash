import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Button, Text } from 'react-native';

import Screen from '../../components/Screen';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { MoneyStackParamList } from '../../navigation/utils/paramLists/MoneyStack';

const Money: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<MoneyStackParamList, SCREENS.MONEY>>();

  const goToTransaction = () =>
    navigation.push(SCREENS.TRANSACTION_WITH_AMOUNT, { amount: 10 });

  return (
    <Screen>
      <Text>Money</Text>
      <Button title="Transaction" onPress={goToTransaction} />
    </Screen>
  );
};

export default Money;
