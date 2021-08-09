import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Overlay from '../../components/Overlay';
import {
  ProfileStackParamList,
  ProfileStackScreenConfigs,
  ProfileStackScreenNames,
} from '../utils/screenConfigs/ProfileStack';

const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileStack: React.FC = () => {
  return (
    <Overlay>
      <Stack.Navigator>
        {ProfileStackScreenNames.map((name) => (
          <Stack.Screen
            key={name}
            name={name}
            {...ProfileStackScreenConfigs[name]}
          />
        ))}
      </Stack.Navigator>
    </Overlay>
  );
};

export default ProfileStack;
