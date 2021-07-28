import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text } from 'react-native';

import Button from '../../components/Button';
import Screen from '../../components/Screen';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { RootStackParamList } from '../../navigation/utils/screenConfigs/RootStack';

const Landing: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, SCREENS.LANDING>>();

  const goToLogin = () => navigation.push(SCREENS.LOGIN);

  return (
    <Screen>
      <Text>Landing</Text>
      <Button title="Login" onPress={goToLogin} />
    </Screen>
  );
};

export default Landing;
