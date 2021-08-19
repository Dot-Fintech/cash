import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as LocalAuthentication from 'expo-local-authentication';
import React from 'react';
import { Alert } from 'react-native';
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
import { RootStackParamList } from '../../navigation/utils/paramLists/RootStack';
import { RAIL_SPACING } from '../../styles/spacing';

const MIDDLE_SPACER_WIDTH = 12;

const Container = styled(Column)`
  padding: 32px ${RAIL_SPACING}px 0;
`;

const Biometrics: React.FC = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, NAVIGATORS.MAIN_TABS>
    >();

  const { width } = useWindowDimensions();

  const goToMain = () => navigation.navigate(NAVIGATORS.MAIN_TABS);

  const authenticate = async () => {
    const result = await LocalAuthentication.authenticateAsync();
    if (result.success) {
      goToMain();
    } else {
      Alert.alert(
        'Something went wrong',
        "We couldn't authenticate you. Please try again.",
      );
    }
  };

  const ICON_WIDTH = Math.min(
    Math.floor((width - 2 * RAIL_SPACING - 0.5 * MIDDLE_SPACER_WIDTH) / 2),
    220,
  );

  return (
    <OnboardingScreen
      primary={{ label: 'Set up', action: authenticate }}
      secondary={{ label: 'Skip', action: goToMain }}
    >
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
