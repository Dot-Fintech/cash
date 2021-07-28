import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Button } from 'react-native';
import { Text } from 'react-native';

import Screen from '../../components/Screen';
import { NAVIGATORS } from '../../navigation/utils/enums/navigators';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { RootStackParamList } from '../../navigation/utils/screenConfigs/RootStack';

const Login: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, SCREENS.LANDING>>();

  const goToMain = () => navigation.push(NAVIGATORS.MAIN_STACK);
  const goToSignUp = () => navigation.push(NAVIGATORS.SIGNUP_STACK);

  return (
    <Screen>
      <Text>Login</Text>
      <Button title="Main" onPress={goToMain} />
      <Button title="Sign Up" onPress={goToSignUp} />
    </Screen>
  );
};

export default Login;
