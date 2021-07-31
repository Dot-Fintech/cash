import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import styled, { useTheme } from 'styled-components';

import Button from '../../components/Button';
import Column from '../../components/Column';
import Logo from '../../components/Logo';
import Row from '../../components/Row';
import Screen from '../../components/Screen';
import Spacer from '../../components/Spacer';
import Typography from '../../components/Typography';
import Vector from '../../components/Vector';
import {
  MetricsIcon,
  PhoneScanIcon,
  PhoneSendIcon,
  POSIcon,
} from '../../icons';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { RootStackParamList } from '../../navigation/utils/screenConfigs/RootStack';
import FutureText from './FutureText';
import { MIDDLE_SPACER_WIDTH, RAIL_SPACING } from './utils';

const Container = styled(Column)`
  padding: 0 ${RAIL_SPACING}px;
  height: 100%;
`;

const LandingPage: React.FC = () => {
  const { colors } = useTheme();

  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, SCREENS.LANDING>>();

  const { width } = useWindowDimensions();

  const goToLogin = () => navigation.push(SCREENS.LOGIN);

  const ICON_WIDTH = Math.min(
    Math.floor((width - 2 * RAIL_SPACING - 0.5 * MIDDLE_SPACER_WIDTH) / 2),
    220,
  );

  return (
    <Screen>
      <Container justifyContent="center" alignItems="center">
        <Typography tag="h3" textAlign="center">
          Welcome to Dot
        </Typography>
        <Spacer height={8} />
        <Logo size={50} />
        <Spacer height={8} />
        <FutureText />
        <Spacer height={16} />
        <Row>
          <Column>
            <Vector vectorIcon={PhoneScanIcon} width={ICON_WIDTH} />
            <Spacer height={16} />
            <Vector vectorIcon={POSIcon} width={ICON_WIDTH} />
          </Column>
          <Spacer width={MIDDLE_SPACER_WIDTH} />
          <Column>
            <Vector vectorIcon={MetricsIcon} width={ICON_WIDTH} />
            <Spacer height={16} />
            <Vector vectorIcon={PhoneSendIcon} width={ICON_WIDTH} />
          </Column>
        </Row>
        <Spacer height={16} />
        <Button onPress={goToLogin} color={colors.main.secondary}>
          Let's Go
        </Button>
      </Container>
    </Screen>
  );
};

export default LandingPage;