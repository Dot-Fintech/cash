import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import styled from 'styled-components';

import Button from '../../components/Button';
import Column from '../../components/Column';
import Logo from '../../components/Logo';
import Screen from '../../components/Screen';
import Spacer from '../../components/Spacer';
import Typography from '../../components/Typography';
import CheckedIcon from '../../icons/CheckedIcon';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { useBlockBack } from '../../navigation/utils/hooks/useBlockBack';
import { SignUpStackParamList } from '../../navigation/utils/screenConfigs/SignUpStack';

const Container = styled(Column)`
  padding: 80px 24px 0 24px;
`;

const EmailVerified: React.FC = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<SignUpStackParamList, SCREENS.VERIFY_EMAIL>
    >();

  useBlockBack(navigation);

  const goToProfilePhoto = () => navigation.navigate(SCREENS.SET_PROFILE_PHOTO);

  return (
    <Screen unsafe>
      <Container justifyContent="center" alignItems="center">
        <Logo size={64} />
        <Spacer height={24} />
        <Typography tag="h3" textAlign="center">
          Nice!
        </Typography>
        <Spacer height={16} />
        <Typography tag="p" textAlign="center">
          We have successfully verified your email.
        </Typography>
        <Spacer height={8} />
        <Typography tag="p" textAlign="center">
          Your journey to cashless spending with Dot is about to begin.
        </Typography>
        <Spacer height={16} />
        <CheckedIcon width={200} />
        <Spacer height={16} />
        <Button onPress={goToProfilePhoto}>Next</Button>
      </Container>
    </Screen>
  );
};

export default EmailVerified;
