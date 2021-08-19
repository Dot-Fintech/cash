import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import styled from 'styled-components';

import Column from '../../components/Column';
import OnboardingScreen from '../../components/OnboardingScreen';
import Spacer from '../../components/Spacer';
import Typography from '../../components/Typography';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { useBlockBack } from '../../navigation/utils/hooks/useBlockBack';
import { SignUpStackParamList } from '../../navigation/utils/paramLists/SignUpStack';

const Container = styled(Column)`
  padding: 16px 24px 0 24px;
`;

const VerifyEmail: React.FC = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<SignUpStackParamList, SCREENS.VERIFY_EMAIL>
    >();

  useBlockBack(navigation);

  return (
    <OnboardingScreen>
      <Container justifyContent="center" alignItems="center">
        <Typography tag="h3" textAlign="center">
          Verify your email address
        </Typography>
        <Spacer height={16} />
        <Typography tag="p" textAlign="center">
          We sent you an email to verify your email address. To continue the
          sign up process, follow the directions outlined in the email.
        </Typography>
        <Spacer height={16} />
        <Typography tag="p" textAlign="center">
          It should take at most 10 minutes for you to receive the email (check
          your spam / junk folder as well) but if you don't receive the email by
          then, please contact support so that we can guide you through the rest
          of the sign up process.
        </Typography>
      </Container>
    </OnboardingScreen>
  );
};

export default VerifyEmail;
