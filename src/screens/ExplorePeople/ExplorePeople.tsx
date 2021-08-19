import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, Text } from 'react-native';

import Screen from '../../components/Screen';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { ExploreTabsParamList } from '../../navigation/utils/paramLists/ExploreTabs';

const ExplorePeople: React.FC = () => {
  const navigation =
    useNavigation<
      BottomTabNavigationProp<ExploreTabsParamList, SCREENS.EXPLORE_PEOPLE>
    >();

  const goToStores = () => navigation.navigate(SCREENS.EXPLORE_STORES);

  return (
    <Screen>
      <Text>Explore People</Text>
      <Button title="Stores" onPress={goToStores} />
    </Screen>
  );
};

export default ExplorePeople;
