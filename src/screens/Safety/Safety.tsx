import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as LocalAuthentication from 'expo-local-authentication';
import React from 'react';
import { Dimensions, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import styled from 'styled-components';

import Button from '../../components/Button';
import Column from '../../components/Column';
import Screen from '../../components/Screen';
import Spacer from '../../components/Spacer';
import Typography from '../../components/Typography';
import { NAVIGATORS } from '../../navigation/utils/enums/navigators';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { RootStackParamList } from '../../navigation/utils/screenConfigs/RootStack';
import { SignUpStackParamList } from '../../navigation/utils/screenConfigs/SignUpStack';
import Card, { CARD_HEIGHT, CARD_WIDTH } from './Card';
import { CARDS } from './utils';

const RAIL_SPACING = 16;

const Container = styled(Column)`
  padding: 0 ${RAIL_SPACING}px;
  width: 100%;
  height: 100%;
`;

const CarouselWrapper = styled(View)`
  height: ${CARD_HEIGHT + 64}px;
`;

const Safety: React.FC = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<
        RootStackParamList & SignUpStackParamList,
        SCREENS.SAFETY
      >
    >();

  const next = async () => {
    if (await LocalAuthentication.hasHardwareAsync()) {
      navigation.push(SCREENS.BIOMETRICS);
    } else {
      navigation.push(NAVIGATORS.MAIN_STACK);
    }
  };

  return (
    <Screen>
      <Container alignItems="center">
        <Typography tag="h3" textAlign="center">
          Security is our priority
        </Typography>
        <Spacer height={16} />
        <CarouselWrapper>
          <Carousel
            layout="stack"
            data={CARDS}
            renderItem={Card}
            sliderWidth={Dimensions.get('window').width}
            sliderHeight={CARD_HEIGHT}
            itemWidth={CARD_WIDTH}
            itemHeight={CARD_HEIGHT}
          />
        </CarouselWrapper>
        <Button onPress={next}>Continue</Button>
      </Container>
    </Screen>
  );
};

export default Safety;
