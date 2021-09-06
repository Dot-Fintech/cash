import React from 'react';
import { Dimensions } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import { useTheme } from 'styled-components';

const HEADER_WIDTH = Dimensions.get('window').width;
const HEADER_BLOCK_HEIGHT = 120;

const TallHeader: React.FC = () => {
  const theme = useTheme();

  return (
    <>
      <Svg
        width={HEADER_WIDTH}
        height={HEADER_BLOCK_HEIGHT}
        viewBox={`0 0 ${HEADER_WIDTH} ${HEADER_BLOCK_HEIGHT}`}
        fill="none"
      >
        <Path
          d="M400 0H0V120H400V0Z"
          fill={theme.colors.main.secondary.toString()}
        />
        <Path
          d="M130 80H90V120H130V80Z"
          fill={theme.colors.background.primary.toString()}
        />
        <Path
          d="M50 40C55.2529 40 60.4543 41.0346 65.3074 43.0448C70.1604 45.055 74.5699 48.0014 78.2842 51.7157C81.9986 55.4301 84.945 59.8396 86.9552 64.6927C88.9654 69.5457 90 74.7471 90 80H50V40Z"
          fill={theme.colors.background.primary.toString()}
        />
        <Path
          d="M130 120C124.747 120 119.546 118.965 114.693 116.955C109.84 114.945 105.43 111.999 101.716 108.284C98.0016 104.57 95.0552 100.16 93.0448 95.3073C91.0344 90.4543 90 85.2529 90 80H130V120Z"
          fill={theme.colors.main.secondary.toString()}
        />
        <Path
          d="M50 40H0V80H50V40Z"
          fill={theme.colors.background.primary.toString()}
        />
        <Path
          d="M90 80H0V120H90V80Z"
          fill={theme.colors.background.primary.toString()}
        />
      </Svg>
    </>
  );
};

export default TallHeader;
