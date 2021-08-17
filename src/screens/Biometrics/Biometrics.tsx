import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components';

import Column from '../../components/Column';
import OnboardingScreen from '../../components/OnboardingScreen';
import Row from '../../components/Row';
import Spacer from '../../components/Spacer';
import Typography from '../../components/Typography';
import FaceIdIcon from '../../icons/FaceIdIcon';
import FingerprintIcon from '../../icons/FingerprintIcon';
import { NAVIGATORS } from '../../navigation/utils/enums/navigators';
import { RootStackParamList } from '../../navigation/utils/screenConfigs/RootStack';

const RAIL_SPACING = 16;
const MIDDLE_SPACER_WIDTH = 12;

const Container = styled(Column)`
  padding: 0 ${RAIL_SPACING}px;
`;

const Biometrics: React.FC = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, NAVIGATORS.MAIN_STACK>
    >();

  const { width } = useWindowDimensions();

  const goToMain = () => navigation.navigate(NAVIGATORS.MAIN_STACK);

  const ICON_WIDTH = Math.min(
    Math.floor((width - 2 * RAIL_SPACING - 0.5 * MIDDLE_SPACER_WIDTH) / 2),
    220,
  );

  return (
    <OnboardingScreen primary={{ label: 'Next', action: goToMain }}>
      <Container alignItems="center">
        <Typography tag="h3">Even more secure</Typography>
        <Spacer height={16} />
        <Typography tag="p" textAlign="center">
          Make your account even more secure by using your face or fingerprint
          to log into the app.
        </Typography>
        <Spacer height={16} />
        <Row justifyContent="space-between" alignItems="center" fullWidth>
          <FingerprintIcon height={200} maxWidth={ICON_WIDTH} />
          <FaceIdIcon height={200} maxWidth={ICON_WIDTH} />
        </Row>
      </Container>
    </OnboardingScreen>
  );
};

export default Biometrics;
