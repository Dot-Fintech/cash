import { useNavigation } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import React from 'react';

import Overlay from '../../components/Overlay';
import { NAVIGATORS } from '../utils/enums/navigators';
import { SCREENS } from '../utils/enums/screens';
import { useBlockBack } from '../utils/hooks/useBlockBack';
import {
  MainStackParamList,
  MainStackScreenConfigs,
  MainStackScreenNames,
} from '../utils/screenConfigs/MainStack';
import { RootStackParamList } from '../utils/screenConfigs/RootStack';

const Stack = createStackNavigator<MainStackParamList>();

const MainStack: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, SCREENS.LANDING>>();

  useBlockBack(navigation);

  return (
    <Overlay>
      <Stack.Navigator initialRouteName={NAVIGATORS.MAIN_TABS}>
        {MainStackScreenNames.map((name) => (
          <Stack.Screen
            key={name}
            name={name}
            {...MainStackScreenConfigs[name]}
          />
        ))}
      </Stack.Navigator>
    </Overlay>
  );
};

export default MainStack;
