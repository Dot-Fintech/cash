import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Button, Text } from 'react-native';

import Screen from '../../components/Screen';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { ProfileStackParamList } from '../../navigation/utils/screenConfigs/ProfileStack';

const Profile: React.FC = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ProfileStackParamList, SCREENS.PROFILE>
    >();

  const goToProfilePhoto = () => navigation.push(SCREENS.CHANGE_PROFILE_PHOTO);
  const goToDocuments = () => navigation.push(SCREENS.DOCUMENTS);

  return (
    <Screen>
      <Text>Profile</Text>
      <Button title="Profile Photo" onPress={goToProfilePhoto} />
      <Button title="Documents" onPress={goToDocuments} />
    </Screen>
  );
};

export default Profile;
