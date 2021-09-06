import React from 'react';
import { useTheme } from 'styled-components';

import Card from '../../components/Card';
import Column from '../../components/Column';
import Row from '../../components/Row';
import Spacer from '../../components/Spacer';
import Typography from '../../components/Typography';
import {
  Bank_Transaction_Type,
  FullBankTransactionSourceFragment,
} from '../../generated/graphql';
import { formatter } from '../../utils/money';

type Props = {
  amount: number;
  source: FullBankTransactionSourceFragment;
  token: string;
};

const Info: React.FC<Props> = ({ amount, source, token }) => {
  const { colors } = useTheme();

  const { card, type } = source;

  return (
    <>
      <Typography tag="h5" color={colors.text.secondary}>
        Card
      </Typography>
      <Spacer height={16} />
      <Column alignItems="center" fullWidth>
        <Card card={card} />
      </Column>
      <Spacer height={16} />
      <Row justifyContent="space-between" fullWidth>
        <Typography tag="h5" color={colors.text.secondary}>
          Amount
        </Typography>
        <Typography tag="h5">{formatter.format(amount)}</Typography>
      </Row>
      <Spacer height={16} />
      <Row justifyContent="space-between" fullWidth>
        <Typography tag="h5" color={colors.text.secondary}>
          Type
        </Typography>
        <Typography tag="h5">
          {type === Bank_Transaction_Type.Deposit ? 'Deposit' : 'Withdrawal'}
        </Typography>
      </Row>
      <Spacer height={16} />
      <Row justifyContent="space-between" fullWidth>
        <Typography tag="h5" color={colors.text.secondary}>
          Token
        </Typography>
        <Typography tag="h5">{token}</Typography>
      </Row>
    </>
  );
};

export default Info;
