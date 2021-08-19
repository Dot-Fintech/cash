import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import OnboardingScreen from '../../components/OnboardingScreen';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { SignUpStackParamList } from '../../navigation/utils/paramLists/SignUpStack';
import ProfilePhoto from './ProfilePhoto';

const SetProfilePhoto: React.FC = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<SignUpStackParamList, SCREENS.SET_PROFILE_PHOTO>
    >();

  const goToSafety = () => navigation.push(SCREENS.SAFETY);

  return (
    <OnboardingScreen secondary={{ label: 'Skip', action: goToSafety }}>
      <ProfilePhoto next={goToSafety} />
    </OnboardingScreen>
  );
};

export default SetProfilePhoto;
