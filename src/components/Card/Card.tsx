import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import styled from 'styled-components';

import { Card_Provider, FullCardFragment } from '../../generated/graphql';
import MastercardIcon from '../../icons/MastercardIcon';
import VisaIcon from '../../icons/VisaIcon';
import { getShadowColor } from '../../styles/shadow';
import { Color, Colors } from '../../theme';
import Column from '../Column';
import Row from '../Row';
import Spacer from '../Spacer';
import Typography from '../Typography';
import { cardStyles } from './styles';

const Container = styled(LinearGradient)`
  ${cardStyles}
  position: relative;
  box-shadow: 4px 4px 8px ${({ theme }) => getShadowColor(theme.name)};
`;

const Info = styled(Column)`
  position: absolute;
  padding: 0 12px;
  bottom: 12px;
`;

type Props = {
  card: FullCardFragment;
  linearGradient: {
    first: Color;
    second: Color;
  };
};

const Card: React.FC<Props> = ({ card, linearGradient }) => {
  const { first, second } = linearGradient;

  return (
    <Container
      colors={[first.toString(), second.toString()]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <Info fullWidth>
        <Typography tag="h4" color={Colors.white}>
          **** **** **** {card.last4Digits}
        </Typography>
        <Spacer height={8} />
        <Row justifyContent="flex-end" fullWidth>
          <Typography tag="h6" color={Colors.white}>
            {card.type}
          </Typography>
        </Row>
        <Spacer height={8} />
        <Row justifyContent="space-between" alignItems="center" fullWidth>
          <Row>
            <Column>
              <Typography tag="sp" color={Colors.white}>
                VALID
              </Typography>
              <Typography tag="sp" color={Colors.white}>
                THRU
              </Typography>
            </Column>
            <Spacer width={8} />
            <Typography tag="h4" color={Colors.white}>
              **/**
            </Typography>
          </Row>
          {card.provider === Card_Provider.Visa ? (
            <VisaIcon height={24} />
          ) : card.provider === Card_Provider.Mastercard ? (
            <MastercardIcon width={80} />
          ) : null}
        </Row>
      </Info>
    </Container>
  );
};

export default Card;
