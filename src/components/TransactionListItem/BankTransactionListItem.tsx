import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled, { useTheme } from 'styled-components';

import {
  Bank_Transaction_Type,
  Card_Provider,
  FullBankTransactionSourceFragment,
} from '../../generated/graphql';
import MastercardIcon from '../../icons/MastercardIcon';
import VisaIcon from '../../icons/VisaIcon';
import { formatter } from '../../utils/money';
import Column from '../Column';
import Row from '../Row';
import Spacer from '../Spacer';
import Typography from '../Typography';

const Container = styled(TouchableOpacity)`
  width: 100%;
  padding: 0;
`;

type Props = {
  amount: number;
  source: FullBankTransactionSourceFragment;
  goToTransaction: () => void;
};

const BankTransactionListItem: React.FC<Props> = ({
  amount,
  source,
  goToTransaction,
}) => {
  const { colors } = useTheme();

  const { card, type } = source;

  const Icon =
    card.provider === Card_Provider.Visa
      ? VisaIcon
      : card.provider === Card_Provider.Mastercard
      ? MastercardIcon
      : undefined;

  return (
    <Container onPress={goToTransaction}>
      <Row justifyContent="space-between" alignItems="center" fullWidth>
        <Row>
          {Icon && <Icon height={20} />}
          <Spacer width={16} />
          <Typography tag="h5">**** {card.last4Digits}</Typography>
        </Row>
        <Spacer width={8} />
        <Column alignItems="flex-end">
          <Typography
            tag="h5"
            color={
              type === Bank_Transaction_Type.Deposit
                ? colors.success.primary
                : colors.text.primary
            }
          >
            {type === Bank_Transaction_Type.Deposit ? '+' : ''}
            {formatter.format(amount)}
          </Typography>
          <Typography tag="p">
            {type === Bank_Transaction_Type.Deposit ? 'Deposited' : 'Withdrew'}
          </Typography>
        </Column>
      </Row>
    </Container>
  );
};

export default BankTransactionListItem;
