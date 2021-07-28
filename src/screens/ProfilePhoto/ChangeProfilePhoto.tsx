import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import { SCREENS } from '../../navigation/utils/enums/screens';
import { ProfileStackParamList } from '../../navigation/utils/screenConfigs/ProfileStack';
import ProfilePhoto from './ProfilePhoto';

const ChangeProfilePhoto: React.FC = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ProfileStackParamList, SCREENS.CHANGE_PROFILE_PHOTO>
    >();

  const goToProfile = () => navigation.pop();

  return <ProfilePhoto next={goToProfile} />;
};

export default ChangeProfilePhoto;
