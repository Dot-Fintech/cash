import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import styled, { useTheme } from 'styled-components';

import AddCardModal from '../../components/AddCardModal';
import Card, {
  CARD_HEIGHT,
  CARD_WIDTH,
  cardStyles,
} from '../../components/Card';
import Column from '../../components/Column';
import Error from '../../components/Error';
import { LoadingBox } from '../../components/Loading';
import MainHeader from '../../components/MainHeader';
import Row from '../../components/Row';
import Screen from '../../components/Screen';
import Spacer from '../../components/Spacer';
import Typography from '../../components/Typography';
import { useCardsLazyQuery } from '../../generated/graphql';
import { TAB_BAR_HEIGHT } from '../../navigation/MainTabs/TabBar';
import { useStyledLinearGradient } from '../../styles/linearGradient';
import { getShadowColor } from '../../styles/shadow';
import { RAIL_SPACING } from '../../styles/spacing';
import { formatCardProvider } from './utils';

const { width } = Dimensions.get('window');

const ACTION_ITEM_GAP = 16;

const CarouselWrapper = styled(View)`
  height: ${CARD_HEIGHT + 64}px;
`;

const EmptyCard = styled(Column)`
  ${cardStyles}
  background-color: ${({ theme }) =>
    theme.colors.background.secondary.toString()};
`;

const ErrorWrapper = styled(Column)`
  padding: 0 ${RAIL_SPACING}px;
`;

type AbsoluteContainerProps = { bottomInset: number };
const AbsoluteContainer = styled(Column)<AbsoluteContainerProps>`
  padding: 0 ${RAIL_SPACING}px;
  position: absolute;
  bottom: ${({ bottomInset }) => bottomInset + TAB_BAR_HEIGHT + 16}px;
`;

const ActionItem = styled(TouchableOpacity)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: ${(width - 2 * RAIL_SPACING - 16) / 2}px;
  height: 100px;
  border-radius: 8px;

  background-color: ${({ theme }) =>
    theme.colors.background.primary.toString()};
  box-shadow: 2px 2px 4px ${({ theme }) => getShadowColor(theme.name)};
`;

const Banking: React.FC = () => {
  const theme = useTheme();

  const { bottom } = useSafeAreaInsets();

  const linearGradient = useStyledLinearGradient();

  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);

  const [getCards, { data, loading, error }] = useCardsLazyQuery();

  useEffect(() => {
    getCards();
  }, []);

  const openAddCardModal = () => setShowAddCardModal(true);
  const closeAddCardModal = () => setShowAddCardModal(false);

  const handleScrollToCardIndex = (index: number) =>
    setSelectedCardIndex(index);

  const cards = data?.getCards;
  const card = cards?.[selectedCardIndex];

  return (
    <Screen>
      <MainHeader />
      <Spacer height={16} />
      <Column alignItems="center" fullWidth>
        <Row justifyContent="space-between" alignItems="center" fullWidth>
          <Row>
            <Spacer width={16} />
            <Typography tag="h4">Cards</Typography>
          </Row>
          <Row>
            <TouchableOpacity onPress={openAddCardModal}>
              <Ionicons
                name="add"
                size={32}
                color={theme.colors.text.primary.toString()}
              />
            </TouchableOpacity>
            <Spacer width={16} />
          </Row>
        </Row>
        <Spacer height={8} />
        {cards ? (
          cards.length > 0 ? (
            <CarouselWrapper>
              <Carousel
                layout="stack"
                data={cards}
                renderItem={({ item }) => (
                  <Card card={item} linearGradient={linearGradient} />
                )}
                sliderWidth={width}
                sliderHeight={CARD_HEIGHT}
                itemWidth={CARD_WIDTH}
                itemHeight={CARD_HEIGHT}
                onSnapToItem={handleScrollToCardIndex}
              />
            </CarouselWrapper>
          ) : (
            <EmptyCard justifyContent="center" alignItems="center">
              <Typography tag="h6" textAlign="center">
                Looks like you haven't added any cards yet.
              </Typography>
              <Spacer height={16} />
              <Typography tag="p" textAlign="center">
                Tap the '+' icon in the top right to add a card.
              </Typography>
            </EmptyCard>
          )
        ) : loading ? (
          <LoadingBox width={CARD_WIDTH} height={CARD_HEIGHT} />
        ) : error ? (
          <ErrorWrapper>
            <Error error={error} message="We can't get your cards right now." />
          </ErrorWrapper>
        ) : null}
      </Column>
      {card && (
        <AbsoluteContainer bottomInset={bottom} fullWidth>
          <Row justifyContent="space-between" alignItems="center" fullWidth>
            <Column>
              <Typography tag="h4">
                {formatCardProvider(cards[selectedCardIndex].provider)}
              </Typography>
              <Spacer height={4} />
              <Typography tag="h6">
                ending with {cards[selectedCardIndex].last4Digits}
              </Typography>
            </Column>
            <Typography tag="h6">{card.type}</Typography>
          </Row>
          <Spacer height={16} />
          <Row fullWidth>
            <ActionItem>
              <Typography tag="h6">Add funds</Typography>
              <Spacer height={4} />
              <Ionicons
                name="log-in"
                size={32}
                color={theme.colors.text.primary.toString()}
              />
            </ActionItem>
            <Spacer width={ACTION_ITEM_GAP} />
            <ActionItem>
              <Typography tag="h6">Transfer funds</Typography>
              <Spacer height={4} />
              <Ionicons
                name="log-out"
                size={32}
                color={theme.colors.text.primary.toString()}
              />
            </ActionItem>
          </Row>
          <Spacer height={24} />
          <Column alignItems="center" fullWidth>
            <TouchableOpacity>
              <Typography tag="h6" color={theme.colors.error.primary}>
                Remove Card
              </Typography>
            </TouchableOpacity>
          </Column>
        </AbsoluteContainer>
      )}
      <AddCardModal isOpen={showAddCardModal} close={closeAddCardModal} />
    </Screen>
  );
};

export default Banking;
