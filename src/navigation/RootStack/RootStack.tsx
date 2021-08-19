import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';

import Overlay from '../../components/Overlay';
import { UserContext } from '../../context/user/state';
import { useMeLazyQuery } from '../../generated/graphql';
import { NAVIGATORS } from '../utils/enums/navigators';
import { SCREENS } from '../utils/enums/screens';
import {
  RootStackParamList,
  RootStackScreenConfigs,
  RootStackScreenNames,
} from '../utils/screenConfigs/RootStack';

const Stack = createStackNavigator<RootStackParamList>();

const RootStack: React.FC = () => {
  const { setUser } = useContext(UserContext);

  const [getMe, { data, loading, error }] = useMeLazyQuery();

  const [initialRouteName, setInitialRouteName] =
    useState<keyof RootStackParamList>();

  useEffect(() => {
    if (data) {
      setUser(data.user);
      setInitialRouteName(NAVIGATORS.MAIN_TABS);
    } else if (!error) {
      getMe();
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      // TODO: if error exists => internal server error
      // should have an error screen
      setInitialRouteName(SCREENS.LANDING);
    }
  }, [error]);

  return !loading ? (
    <Overlay>
      <Stack.Navigator initialRouteName={initialRouteName}>
        {RootStackScreenNames.map((name) => (
          <Stack.Screen
            key={name}
            name={name}
            {...RootStackScreenConfigs[name]}
          />
        ))}
      </Stack.Navigator>
    </Overlay>
  ) : null;
};

export default RootStack;
