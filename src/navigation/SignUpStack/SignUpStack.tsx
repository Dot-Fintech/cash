import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Overlay from '../../components/Overlay';
import Biometrics from '../../screens/Biometrics';
import EmailVerified from '../../screens/EmailVerified';
import { SetProfilePhoto } from '../../screens/ProfilePhoto';
import Safety from '../../screens/Safety';
import SignUp from '../../screens/SignUp';
import VerifyEmail from '../../screens/VerifyEmail';
import { SCREENS } from '../utils/enums/screens';
import { SignUpStackParamList } from '../utils/paramLists/SignUpStack';

const Stack = createStackNavigator<SignUpStackParamList>();

const SignUpStack: React.FC = () => {
  return (
    <Overlay>
      <Stack.Navigator>
        <Stack.Screen
          component={SignUp}
          name={SCREENS.SIGN_UP}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={VerifyEmail}
          name={SCREENS.VERIFY_EMAIL}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          component={EmailVerified}
          name={SCREENS.EMAIL_VERIFIED}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={SetProfilePhoto}
          name={SCREENS.SET_PROFILE_PHOTO}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Safety}
          name={SCREENS.SAFETY}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Biometrics}
          name={SCREENS.BIOMETRICS}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </Overlay>
  );
};

export default SignUpStack;
