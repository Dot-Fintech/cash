import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Button, Text } from 'react-native';

import Screen from '../../components/Screen';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { HomeStackParamList } from '../../navigation/utils/paramLists/HomeStack';

const UserSummary: React.FC = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<HomeStackParamList, SCREENS.USER_SUMMARY>
    >();

  const goToTransaction = () =>
    navigation.push(SCREENS.TRANSACTION_WITH_USER, { userId: '1' });

  return (
    <Screen>
      <Text>User Summary</Text>
      <Button title="Transaction" onPress={goToTransaction} />
    </Screen>
  );
};

export default UserSummary;
