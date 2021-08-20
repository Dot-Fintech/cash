import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import Row from '../Row';
import Spacer from '../Spacer';
import Number from './Number';
import { popValue, pushValue } from './utils';

const EmptyBox = styled(View)`
  width: 100%;
`;

const BackspaceContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 64px;
  border: none;
  background: none;
  padding: 0;
`;

type Props = {
  amount: number;
  setAmount: (amount: number) => void;
};

const Numberpad: React.FC<Props> = ({ amount, setAmount }) => {
  const handlePushValue = (value: number) => {
    setAmount(pushValue(amount, value));
  };

  const handlePopValue = () => {
    setAmount(popValue(amount));
  };

  return (
    <>
      <Row justifyContent="space-between" fullWidth>
        <Number value={1} onClick={handlePushValue} />
        <Number value={2} onClick={handlePushValue} />
        <Number value={3} onClick={handlePushValue} />
      </Row>
      <Spacer height={16} />
      <Row justifyContent="space-between" fullWidth>
        <Number value={4} onClick={handlePushValue} />
        <Number value={5} onClick={handlePushValue} />
        <Number value={6} onClick={handlePushValue} />
      </Row>
      <Spacer height={16} />
      <Row justifyContent="space-between" fullWidth>
        <Number value={7} onClick={handlePushValue} />
        <Number value={8} onClick={handlePushValue} />
        <Number value={9} onClick={handlePushValue} />
      </Row>
      <Spacer height={16} />
      <Row justifyContent="center" fullWidth>
        <EmptyBox />
        <Number value={0} onClick={handlePushValue} />
        <BackspaceContainer onClick={handlePopValue} type="button">
          <Ionicons name="arrow-back-sharp" color="light" />
        </BackspaceContainer>
      </Row>
    </>
  );
};

export default Numberpad;
