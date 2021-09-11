import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Overlay from '../../components/Overlay';
import Documents from '../../screens/Documents';
import Profile from '../../screens/Profile';
import { ChangeProfilePhoto } from '../../screens/ProfilePhoto';
import UploadDocuments from '../../screens/UploadDocument';
import { SCREENS } from '../utils/enums/screens';
import { ProfileStackParamList } from '../utils/paramLists/ProfileStack';

const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileStack: React.FC = () => {
  return (
    <Overlay>
      <Stack.Navigator>
        <Stack.Screen
          component={Profile}
          name={SCREENS.PROFILE}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={ChangeProfilePhoto}
          name={SCREENS.CHANGE_PROFILE_PHOTO}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Documents}
          name={SCREENS.DOCUMENTS}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={UploadDocuments}
          name={SCREENS.UPLOAD_DOCUMENT}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </Overlay>
  );
};

export default ProfileStack;
