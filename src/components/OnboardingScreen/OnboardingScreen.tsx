import React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled, { useTheme } from 'styled-components';

import Button from '../Button';
import Column from '../Column';
import Screen from '../Screen';
import Spacer from '../Spacer';
import Typography from '../Typography';
import Header from './Header';

const { width } = Dimensions.get('window');

type ButtonContainerProps = { bottomInset: number };
const ButtonContainer = styled(Column)<ButtonContainerProps>`
  position: absolute;
  bottom: ${({ bottomInset }) => bottomInset + 100}px;
`;

const PrimaryButton = styled(Button)`
  width: ${width - 2 * 32}px;
`;

type OnboardingButton = {
  label: string;
  action: () => void;
};

type Props = {
  primary?: OnboardingButton;
  secondary?: OnboardingButton;
};

const OnboardingScreen: React.FC<Props> = ({
  primary,
  secondary,
  children,
}) => {
  const theme = useTheme();

  const { bottom } = useSafeAreaInsets();

  return (
    <Column alignItems="center">
      <Screen unsafe>
        <Header />
        {children}
      </Screen>
      {(primary || secondary) && (
        <ButtonContainer bottomInset={bottom} alignItems="center">
          {primary && (
            <PrimaryButton onPress={primary.action}>
              {primary.label}
            </PrimaryButton>
          )}
          {primary && secondary && <Spacer height={12} />}
          {secondary && (
            <TouchableOpacity onPress={secondary.action}>
              <Typography tag="h6" color={theme.colors.main.secondary}>
                {secondary.label}
              </Typography>
            </TouchableOpacity>
          )}
        </ButtonContainer>
      )}
    </Column>
  );
};

export default OnboardingScreen;
