import React from 'react';
import { Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components';

import Button from '../Button';
import Column from '../Column';
import Screen from '../Screen';
import Header from './Header';

type NextButtonProps = {
  bottomInset: number;
};
const NextButton = styled(Button)<NextButtonProps>`
  width: ${Dimensions.get('window').width - 2 * 32}px;
  bottom: ${({ bottomInset }) => bottomInset + 120}px;
`;

type Props = {
  next?: () => void;
};

const OnboardingScreen: React.FC<Props> = ({ next, children }) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <Column alignItems="center">
      <Screen unsafe>
        <Header />
        {children}
      </Screen>
      {next && (
        <NextButton onPress={next} bottomInset={bottom}>
          Next
        </NextButton>
      )}
    </Column>
  );
};

export default OnboardingScreen;
