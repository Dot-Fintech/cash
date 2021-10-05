import { scaleLinear, scaleTime } from 'd3-scale';
import { curveMonotoneX, line } from 'd3-shape';
import { max, min } from 'date-fns';
import React, { createRef, useEffect } from 'react';
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { Defs, LinearGradient, Path, Stop, Svg } from 'react-native-svg';
import styled, { css, useTheme } from 'styled-components';
import { svgPathProperties } from 'svg-path-properties';

import {
  DailyBalance,
  Time_Frame,
  useGetDailyBalancesLazyQuery,
} from '../../generated/graphql';
import { formatter } from '../../utils/money';
import Column from '../Column';
import Error from '../Error';
import { LoadingBox } from '../Loading';

const STROKE_WIDTH = 4;
const CURSOR_SIZE = 28;
const LABEL_WRAPPER_WIDTH = 100;

type ContainerProps = {
  width: number;
  height: number;
};
const Container = styled(View)<ContainerProps>`
  position: relative;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  margin-top: ${CURSOR_SIZE + 16}px;
`;

const Cursor = styled(View)`
  width: ${CURSOR_SIZE}px;
  height: ${CURSOR_SIZE}px;
  border-radius: ${CURSOR_SIZE / 2}px;
  border-width: ${CURSOR_SIZE / 5}px;
  border-color: ${({ theme }) => theme.colors.main.secondary.toString()};
  background-color: ${({ theme }) =>
    theme.colors.background.primary.toString()};
`;

const LabelWrapper = styled(Animated.View)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -${CURSOR_SIZE + 20}px;
  left: 0;
  width: ${LABEL_WRAPPER_WIDTH}px;
  padding: 4px;
  border-radius: 4px;
  background-color: ${({ theme }) =>
    theme.colors.background.secondary.toString()};
`;

const LABEL_TAG = 'h5';
const Label = styled(TextInput)`
  ${({ theme }) => css`
    color: ${theme.colors.text.primary.toString()}
    font-family: ${theme.typography[LABEL_TAG].fontFamily};
    font-size: ${theme.typography[LABEL_TAG].fontSize}px;
    font-weight: ${theme.typography[LABEL_TAG].fontWeight};
    letter-spacing: ${theme.typography[LABEL_TAG].letterSpacing}px;
  `}
`;

const EmptyView = styled(View)<ContainerProps>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: ${({ theme }) =>
    theme.colors.background.secondary.toString()};
`;

const ErrorContainer = styled(Column)<ContainerProps>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: ${({ theme }) =>
    theme.colors.background.secondary.toString()};
`;

type Props = {
  width: number;
  height: number;
  selectedTimeFrameState: [
    Time_Frame,
    React.Dispatch<React.SetStateAction<Time_Frame>>,
  ];
};

const x = new Animated.Value(0);

const DailyBalancesChart: React.FC<Props> = ({
  width,
  height,
  selectedTimeFrameState,
}) => {
  const dimensions = { width, height };

  const theme = useTheme();

  const [getDailyBalances, { data, loading, error }] =
    useGetDailyBalancesLazyQuery();

  const [selectedTimeFrame] = selectedTimeFrameState;

  useEffect(() => {
    moveCursor(0);
  }, []);

  useEffect(() => {
    getDailyBalances({
      variables: { data: { timeFrame: selectedTimeFrame } },
    });
  }, [selectedTimeFrame]);

  const cursorRef = createRef<View>();
  const labelRef = createRef<TextInput>();

  const dailyBalances = (data?.getDailyBalances ?? []).map((db) => ({
    ...db,
    date: new Date(db.date),
  }));

  const dates = dailyBalances.map(({ date }) => date);
  const balances = dailyBalances.map(({ balance }) => balance);

  const balanceDomain = [Math.min(...balances), Math.max(...balances)];
  const scaleX = scaleTime()
    .domain([min(dates), max(dates)])
    .range([0, width]);
  const scaleY = scaleLinear()
    .domain(balanceDomain)
    .range([height - STROKE_WIDTH, STROKE_WIDTH]);

  const curve = line<DailyBalance>()
    .x((d) => scaleX(d.date))
    .y((d) => scaleY(d.balance))
    .curve(curveMonotoneX)(dailyBalances);

  const properties = curve ? new svgPathProperties(curve) : undefined;
  const curveLength = properties?.getTotalLength() ?? 0;

  const moveCursor = (value: number) => {
    if (properties) {
      const { x, y } = properties.getPointAtLength(curveLength - value);
      cursorRef.current?.setNativeProps({
        top: y - CURSOR_SIZE / 2,
        left: x - CURSOR_SIZE / 2,
      });
      const amount = scaleY.invert(y);
      labelRef.current?.setNativeProps({ text: formatter.format(amount) });
    }
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const value = e.nativeEvent.contentOffset.x;
    moveCursor(value);
    x.setValue(value);
  };

  const translateX = x.interpolate({
    inputRange: [0, curveLength],
    outputRange: [width - LABEL_WRAPPER_WIDTH, 0],
    extrapolate: 'clamp',
  });

  if (!curve) return <EmptyView {...dimensions} />;

  return dailyBalances.length > 0 ? (
    <Container {...dimensions}>
      <Svg {...dimensions}>
        <Defs>
          <LinearGradient id="gradient" x1="50%" y1="0%" x2="50%" y2="100%">
            <Stop stopColor={theme.colors.main.secondary.toString()} />
            <Stop
              offset="1"
              stopColor={theme.colors.background.primary.toString()}
            />
          </LinearGradient>
        </Defs>
        <Path
          d={curve ?? undefined}
          fill="transparent"
          stroke={theme.colors.main.secondary.toString()}
          strokeWidth={STROKE_WIDTH}
        />
        <Path
          d={curve ? `${curve} L ${width} ${height} L 0 ${height}` : undefined}
          fill="url(#gradient)"
        />
        <Cursor ref={cursorRef} />
      </Svg>
      <LabelWrapper style={{ transform: [{ translateX }] }}>
        <Label ref={labelRef} />
      </LabelWrapper>
      <Animated.ScrollView
        style={StyleSheet.absoluteFill}
        contentContainerStyle={{ width: curveLength * 2 }}
        onScroll={handleScroll}
        scrollEventThrottle={32}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        horizontal
      />
    </Container>
  ) : loading ? (
    <LoadingBox {...dimensions} />
  ) : error ? (
    <ErrorContainer
      width={width}
      height={height}
      justifyContent="center"
      alignItems="center"
    >
      <Error
        error={error}
        message="We can't get your balance history right now."
      />
    </ErrorContainer>
  ) : null;
};

export default DailyBalancesChart;
