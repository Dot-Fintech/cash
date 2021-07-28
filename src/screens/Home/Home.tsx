import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Button, Text } from 'react-native';

import Screen from '../../components/Screen';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { HomeStackParamList } from '../../navigation/utils/screenConfigs/HomeStack';

const Home: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<HomeStackParamList, SCREENS.HOME>>();

  const goToUser = () => navigation.push(SCREENS.USER_SUMMARY, { userId: '1' });

  return (
    <Screen>
      <Text>Home</Text>
      <Button title="User" onPress={goToUser} />
    </Screen>
  );
};

export default Home;
