import React from 'react';
import { Dimensions } from 'react-native';
import styled, { useTheme } from 'styled-components';

import {
  Bank_Transaction_Type,
  P2P_Transaction_Type,
} from '../../generated/graphql';
import BankIcon from '../../icons/BankIcon';
import PhonePayIcon from '../../icons/PhonePayIcon';
import PhoneSendIcon from '../../icons/PhoneSendIcon';
import { RAIL_SPACING } from '../../styles/spacing';
import Button from '../Button';
import Column from '../Column';
import Spacer from '../Spacer';
import Typography from '../Typography';

const ICON_PROPS = {
  width: Dimensions.get('window').width - 2 * RAIL_SPACING,
  maxHeight: Dimensions.get('window').height / 2.5,
};

const Container = styled(Column)`
  height: 100%;
  padding: 0 ${RAIL_SPACING}px;
  background-color: ${({ theme }) =>
    theme.colors.background.primary.toString()};
`;

type Props = {
  description: string;
  type: P2P_Transaction_Type | Bank_Transaction_Type;
  onComplete: () => void;
};

const TransactionSuccess: React.FC<Props> = ({
  description,
  type,
  onComplete,
}) => {
  const theme = useTheme();

  return (
    <Container justifyContent="center" alignItems="center">
      <Typography tag="h1" color={theme.colors.success.primary}>
        Success!
      </Typography>
      <Spacer height={16} />
      <Typography tag="h6" textAlign="center">
        {description}
      </Typography>
      <Spacer height={32} />
      {type === P2P_Transaction_Type.Send ? (
        <PhoneSendIcon {...ICON_PROPS} />
      ) : type === P2P_Transaction_Type.Request ? (
        <PhonePayIcon {...ICON_PROPS} />
      ) : (
        <BankIcon {...ICON_PROPS} />
      )}
      <Spacer height={32} />
      <Button onPress={onComplete}>Continue</Button>
    </Container>
  );
};

export default TransactionSuccess;