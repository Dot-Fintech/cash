import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components';

import { Card_Provider, FullCardFragment } from '../../generated/graphql';
import MastercardIcon from '../../icons/MastercardIcon';
import VisaIcon from '../../icons/VisaIcon';
import { Color, Colors } from '../../theme';
import Row from '../Row';
import Typography from '../Typography';

const CARD_AR = 1.75;
const CARD_PADDING = 8;
export const CARD_HEIGHT = 120;
export const CARD_WIDTH = CARD_AR * CARD_HEIGHT;

const Container = styled(TouchableOpacity)`
  position: relative;
  min-width: ${CARD_WIDTH}px;
  min-height: ${CARD_HEIGHT}px;
  background-color: ${({ theme }) =>
    (theme.name === 'light'
      ? new Color({ ...Colors.black, opacity: 0.1 })
      : new Color({ ...Colors.white, opacity: 0.2 })
    ).toString()};
  border-radius: 8px;
  padding: ${CARD_PADDING}px;
`;

const InfoRow = styled(Row)`
  position: absolute;
  bottom: 0;
`;

type Props = {
  card: FullCardFragment;
};

const Card: React.FC<Props> = ({ card }) => {
  const handleClick = () => {
    // if (!history.location.pathname.includes(BASE_ROUTES.CARD_SUMMARY)) {
    //   history.push(`${BASE_ROUTES.CARD_SUMMARY}/${card.token}`);
    // }
  };

  return (
    <Container onPress={handleClick}>
      <InfoRow justifyContent="space-between" alignItems="center">
        {card.provider === Card_Provider.Visa ? (
          <VisaIcon height={20} />
        ) : card.provider === Card_Provider.Mastercard ? (
          <MastercardIcon height={20} />
        ) : (
          <View />
        )}
        <Typography tag="h4" color={Colors.white}>
          **** {card.last4Digits}
        </Typography>
      </InfoRow>
    </Container>
  );
};

export default Card;
