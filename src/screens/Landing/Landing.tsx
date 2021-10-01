import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, useWindowDimensions } from 'react-native';
import styled, { useTheme } from 'styled-components';

import Button from '../../components/Button';
import Column from '../../components/Column';
import Logo from '../../components/Logo';
import Row from '../../components/Row';
import Screen from '../../components/Screen';
import Spacer from '../../components/Spacer';
import Typography from '../../components/Typography';
import { UserContext } from '../../context/user/state';
import { useMeLazyQuery } from '../../generated/graphql';
import MetricsIcon from '../../icons/MetricsIcon';
import PhoneScanIcon from '../../icons/PhoneSendIcon';
import PhoneSendIcon from '../../icons/PhoneSendIcon';
import POSIcon from '../../icons/POSIcon';
import { NAVIGATORS } from '../../navigation/utils/enums/navigators';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { RootStackParamList } from '../../navigation/utils/paramLists/RootStack';
import { RAIL_SPACING } from '../../styles/spacing';
import LoadingScreen from '../Loading';
import FutureText from './FutureText';
import { MIDDLE_SPACER_WIDTH } from './utils';

const { width } = Dimensions.get('window');

const Container = styled(Column)`
  padding: 0 ${RAIL_SPACING}px;
  height: 100%;
`;

const PrimaryButton = styled(Button)`
  width: ${width - 2 * 32}px;
`;

const LandingPage: React.FC = () => {
  const { colors } = useTheme();

  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, SCREENS.LANDING>>();

  const { width } = useWindowDimensions();

  const { setUser } = useContext(UserContext);

  const [getMe, { data, loading, error }] = useMeLazyQuery();

  const [requested, setRequested] = useState(false);

  useEffect(() => {
    if (data) {
      setUser(data.user);
      navigation.push(NAVIGATORS.MAIN_TABS);
    } else {
      getMe();
      setRequested(true);
    }
  }, [data]);

  useEffect(() => {
    if (!data && error) {
      // TODO: go to error page
    }
  }, [error]);

  const goToLogin = () => navigation.push(SCREENS.LOGIN);

  const ICON_WIDTH = Math.min(
    Math.floor((width - 2 * RAIL_SPACING - 0.5 * MIDDLE_SPACER_WIDTH) / 2),
    220,
  );

  return requested && !loading && !data && !error ? (
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
            <PhoneScanIcon width={ICON_WIDTH} />
            <Spacer height={16} />
            <POSIcon width={ICON_WIDTH} />
          </Column>
          <Spacer width={MIDDLE_SPACER_WIDTH} />
          <Column>
            <MetricsIcon width={ICON_WIDTH} />
            <Spacer height={16} />
            <PhoneSendIcon width={ICON_WIDTH} />
          </Column>
        </Row>
        <Spacer height={24} />
        <PrimaryButton onPress={goToLogin} color={colors.main.secondary}>
          Let's Go
        </PrimaryButton>
      </Container>
    </Screen>
  ) : (
    <LoadingScreen />
  );
};

export default LandingPage;
