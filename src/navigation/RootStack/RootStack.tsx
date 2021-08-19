import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useTheme } from 'styled-components';

import MainHeader from '../../components/MainHeader';
import Overlay from '../../components/Overlay';
import { UserContext } from '../../context/user/state';
import { useMeLazyQuery } from '../../generated/graphql';
import Landing from '../../screens/Landing';
import Login from '../../screens/Login';
import MainTabs from '../MainTabs';
import SignUpStack from '../SignUpStack';
import { NAVIGATORS } from '../utils/enums/navigators';
import { SCREENS } from '../utils/enums/screens';
import { RootStackParamList } from '../utils/paramLists/RootStack';

const Stack = createStackNavigator<RootStackParamList>();

const RootStack: React.FC = () => {
  const theme = useTheme();

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
      // replace with an error screen
      setInitialRouteName(SCREENS.LANDING);
    }
  }, [error]);

  return !loading ? (
    <Overlay>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen
          component={Landing}
          name={SCREENS.LANDING}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Login}
          name={SCREENS.LOGIN}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={MainTabs}
          name={NAVIGATORS.MAIN_TABS}
          options={{
            header: (props) => (
              <MainHeader iconColor={theme.colors.text.primary} {...props} />
            ),
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          component={SignUpStack}
          name={NAVIGATORS.SIGNUP_STACK}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </Overlay>
  ) : null;
};

export default RootStack;
