import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import Screen from '../../components/Screen';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { ProfileStackParamList } from '../../navigation/utils/paramLists/ProfileStack';
import ProfilePhoto from './ProfilePhoto';

const ChangeProfilePhoto: React.FC = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ProfileStackParamList, SCREENS.CHANGE_PROFILE_PHOTO>
    >();

  const goToProfile = () => navigation.pop();

  return (
    <Screen>
      <ProfilePhoto next={goToProfile} />
    </Screen>
  );
};

export default ChangeProfilePhoto;
