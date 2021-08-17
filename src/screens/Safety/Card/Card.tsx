import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';

import Column from '../../../components/Column';
import Spacer from '../../../components/Spacer';
import Typography from '../../../components/Typography';
import { Card } from '../utils';
import { getShadowColor } from './utils';

const RAIL_SPACING = 16;

export const CARD_WIDTH = Dimensions.get('window').width - 2 * RAIL_SPACING;
export const CARD_HEIGHT = 360;

const Container = styled(Column)`
  padding: 16px ${RAIL_SPACING}px;
  width: ${CARD_WIDTH}px;
  height: ${CARD_HEIGHT}px;
  background-color: ${({ theme }) =>
    theme.colors.background.primary.toString()};
  border-radius: 16px;
  box-shadow: 2px 2px 4px ${({ theme }) => getShadowColor(theme.name)};
`;

type Props = {
  item: Card;
};

const CardComponent: React.FC<Props> = ({ item }) => {
  const { Icon, title, description } = item;

  return (
    <Container justifyContent="center" alignItems="center">
      <Icon height={200} maxWidth={Dimensions.get('window').width - 64} />
      <Spacer height={16} />
      <Typography tag="h4" textAlign="center">
        {title}
      </Typography>
      <Spacer height={4} />
      <Typography tag="p" textAlign="center">
        {description}
      </Typography>
    </Container>
  );
};

export default CardComponent;
