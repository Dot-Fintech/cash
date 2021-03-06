import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components';

import Column from '../../../components/Column';
import MainHeader from '../../../components/MainHeader';
import SlideSelect, {
  OPTION_HEIGHT,
  SlideSelectOption,
} from '../../../components/SlideSelect';
import Spacer from '../../../components/Spacer';
import TextField from '../../../components/TextField';
import { SCREENS } from '../../../navigation/utils/enums/screens';
import { ExploreTabsParamList } from '../../../navigation/utils/paramLists/ExploreTabs';
import { Colors } from '../../../theme';
import { options } from '../utils';

type AbsoluteContainerProps = {
  topInset: number;
};
const AbsoluteContainer = styled(Column)<AbsoluteContainerProps>`
  position: absolute;
  top: ${({ topInset }) => topInset}px;
  z-index: 2;
`;

const SearchContainer = styled(Column)`
  border-radius: ${OPTION_HEIGHT / 2}px;
  background-color: rgba(0, 0, 0, 0.1);
  width: 90%;
`;

const SearchField = styled(TextField)`
  height: ${OPTION_HEIGHT - 8}px;
`;

type ExploreScreen = SCREENS.EXPLORE_STORES | SCREENS.EXPLORE_PEOPLE;

type Props = {
  screen: ExploreScreen;
  onChangeText?: (value: string) => void;
};

const SearchGroup: React.FC<Props> = ({ screen, onChangeText }) => {
  const navigation =
    useNavigation<BottomTabNavigationProp<ExploreTabsParamList>>();

  const { top } = useSafeAreaInsets();

  const handleOptionChange = (selectedOption: SlideSelectOption) => {
    if (selectedOption.id !== screen) {
      navigation.navigate(selectedOption.id as ExploreScreen);
    }
  };

  const selectedOption =
    screen === SCREENS.EXPLORE_STORES ? options[0] : options[1];

  return (
    <AbsoluteContainer topInset={top} alignItems="center" fullWidth>
      <MainHeader iconColor={Colors.white} />
      <Spacer height={16} />
      <SearchContainer fullWidth>
        <SlideSelect
          options={options}
          selectedOption={selectedOption}
          setSelectedOption={handleOptionChange}
          variant="translucent"
        />
        <SearchField
          onChangeText={onChangeText}
          color={Colors.white}
          borderColor={Colors.transparent}
          search
        />
      </SearchContainer>
    </AbsoluteContainer>
  );
};

export default SearchGroup;
