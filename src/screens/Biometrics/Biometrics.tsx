import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Button, Text } from 'react-native';

import Screen from '../../components/Screen';
import { NAVIGATORS } from '../../navigation/utils/enums/navigators';
import { RootStackParamList } from '../../navigation/utils/screenConfigs/RootStack';

const Biometrics: React.FC = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, NAVIGATORS.MAIN_STACK>
    >();

  const goToMain = () => navigation.navigate(NAVIGATORS.MAIN_STACK);

  return (
    <Screen>
      <Text>Biometrics</Text>
      <Button title="Main" onPress={goToMain} />
    </Screen>
  );
};

export default Biometrics;
