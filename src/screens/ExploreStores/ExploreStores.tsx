import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, Text } from 'react-native';

import Screen from '../../components/Screen';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { ExploreTabsParamList } from '../../navigation/utils/paramLists/ExploreTabs';

const ExploreStores: React.FC = () => {
  const navigation =
    useNavigation<
      BottomTabNavigationProp<ExploreTabsParamList, SCREENS.EXPLORE_STORES>
    >();

  const goToPeople = () => navigation.navigate(SCREENS.EXPLORE_PEOPLE);

  return (
    <Screen>
      <Text>Explore Stores</Text>
      <Button title="People" onPress={goToPeople} />
    </Screen>
  );
};

export default ExploreStores;
