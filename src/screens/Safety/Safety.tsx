import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Button, Text } from 'react-native';

import Screen from '../../components/Screen';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { SignUpStackParamList } from '../../navigation/utils/screenConfigs/SignUpStack';

const Safety: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<SignUpStackParamList, SCREENS.SAFETY>>();

  const goToBiometrics = () => navigation.push(SCREENS.BIOMETRICS);

  return (
    <Screen>
      <Text>Safety</Text>
      <Button title="Biometrics" onPress={goToBiometrics} />
    </Screen>
  );
};

export default Safety;
