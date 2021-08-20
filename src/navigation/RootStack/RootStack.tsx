import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from 'styled-components';

import MainHeader from '../../components/MainHeader';
import Overlay from '../../components/Overlay';
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

  return (
    <Overlay>
      <Stack.Navigator initialRouteName={SCREENS.LANDING}>
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
  );
};

export default RootStack;
