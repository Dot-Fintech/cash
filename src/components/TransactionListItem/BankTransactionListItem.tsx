import { Column, Row, Spacer, Typography, Vector } from '@dot-fintech/web-ui';
import Container from 'components/UserListItem/Container';
import {
  Bank_Transaction_Type,
  Card_Provider,
  FullBankTransactionSourceFragment,
} from 'generated/graphql';
import { MastercardIcon, VisaIcon } from 'icons';
import { BASE_ROUTES } from 'pages/utils/routes';
import React from 'react';
import { useHistory } from 'react-router';
import { useTheme } from 'styled-components';
import { formatter } from 'utils/money';

type Props = {
  amount: number;
  source: FullBankTransactionSourceFragment;
  token: string;
};

const BankTransactionListItem: React.FC<Props> = ({
  amount,
  source,
  token,
}) => {
  const history = useHistory();

  const { colors } = useTheme();

  const handleClick = () =>
    history.push(`${BASE_ROUTES.BANK_TRANSACTION_SUMMARY}/${token}`);

  const { card, type } = source;

  const vectorIcon =
    card.provider === Card_Provider.Visa
      ? VisaIcon
      : card.provider === Card_Provider.Mastercard
      ? MastercardIcon
      : undefined;

  return (
    <Container onClick={handleClick}>
      <Row justifyContent="space-between" alignItems="center" fullWidth>
        <Row>
          {vectorIcon && <Vector vectorIcon={vectorIcon} height={20} />}
          <Spacer width={16} />
          <Typography as="h5">**** {card.last4Digits}</Typography>
        </Row>
        <Spacer width={8} />
        <Column alignItems="flex-end">
          <Typography
            as="h5"
            textColor={
              type === Bank_Transaction_Type.Deposit
                ? colors.success.primary
                : colors.text.primary
            }
          >
            {type === Bank_Transaction_Type.Deposit ? '+' : ''}
            {formatter.format(amount)}
          </Typography>
          <Typography as="p">
            {type === Bank_Transaction_Type.Deposit ? 'Deposited' : 'Withdrew'}
          </Typography>
        </Column>
      </Row>
    </Container>
  );
};

export default BankTransactionListItem;
