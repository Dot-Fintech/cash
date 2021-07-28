import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Button, Text } from 'react-native';

import Screen from '../../components/Screen';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { SignUpStackParamList } from '../../navigation/utils/screenConfigs/SignUpStack';

const SignUp: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<SignUpStackParamList, SCREENS.SIGN_UP>>();

  const goToProfilePhoto = () => navigation.push(SCREENS.SET_PROFILE_PHOTO);

  return (
    <Screen>
      <Text>Sign Up</Text>
      <Button title="Profile Photo" onPress={goToProfilePhoto} />
    </Screen>
  );
};

export default SignUp;
