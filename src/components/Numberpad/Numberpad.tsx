import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled, { useTheme } from 'styled-components';

import Row from '../Row';
import Spacer from '../Spacer';
import Number from './Number';
import { popValue, pushValue } from './utils';

const EmptyBox = styled(View)`
  width: 33%;
`;

const BackspaceContainer = styled(TouchableOpacity)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33%;
  height: 64px;
  padding: 0;
`;

type Props = {
  amount: number;
  setAmount: (amount: number) => void;
};

const Numberpad: React.FC<Props> = ({ amount, setAmount }) => {
  const theme = useTheme();

  const handlePushValue = (value: number) => {
    setAmount(pushValue(amount, value));
  };

  const handlePopValue = () => {
    setAmount(popValue(amount));
  };

  return (
    <>
      <Row justifyContent="space-between" fullWidth>
        <Number value={1} onPress={handlePushValue} />
        <Number value={2} onPress={handlePushValue} />
        <Number value={3} onPress={handlePushValue} />
      </Row>
      <Spacer height={16} />
      <Row justifyContent="space-between" fullWidth>
        <Number value={4} onPress={handlePushValue} />
        <Number value={5} onPress={handlePushValue} />
        <Number value={6} onPress={handlePushValue} />
      </Row>
      <Spacer height={16} />
      <Row justifyContent="space-between" fullWidth>
        <Number value={7} onPress={handlePushValue} />
        <Number value={8} onPress={handlePushValue} />
        <Number value={9} onPress={handlePushValue} />
      </Row>
      <Spacer height={16} />
      <Row justifyContent="center" fullWidth>
        <EmptyBox />
        <Number value={0} onPress={handlePushValue} />
        <BackspaceContainer onPress={handlePopValue}>
          <Ionicons
            name="arrow-back-sharp"
            color={theme.colors.text.primary.toString()}
            size={36}
          />
        </BackspaceContainer>
      </Row>
    </>
  );
};

export default Numberpad;
