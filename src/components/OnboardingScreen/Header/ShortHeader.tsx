import React from 'react';
import { Dimensions } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import { useTheme } from 'styled-components';

const HEADER_WIDTH = Dimensions.get('window').width;
const HEADER_BLOCK_HEIGHT = 80;

const ShortHeader: React.FC = () => {
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
          d="M400 0H0V80H400V0Z"
          fill={theme.colors.main.secondary.toString()}
        />
        <Path
          d="M130 53H90V80H130V53Z"
          fill={theme.colors.background.primary.toString()}
        />
        <Path
          d="M50 27C55.2529 27 60.4543 27.3565 65.3074 28.6966C70.1604 30.0367 74.5699 32.001 78.2842 34.4772C81.9986 36.9535 84.945 39.8932 86.9552 43.1286C88.9654 46.3639 90 49.8315 90 53H50V27Z"
          fill={theme.colors.background.primary.toString()}
        />
        <Path
          d="M130 80C124.747 80 119.546 79.3099 114.693 77.9699C109.84 76.6299 105.43 74.6659 101.716 72.1892C98.0016 69.7132 95.0552 66.7732 93.0448 63.5381C91.0344 60.3028 90 56.8352 90 53H130V80Z"
          fill={theme.colors.main.secondary.toString()}
        />
        <Path
          d="M50 27H0V53H50V27Z"
          fill={theme.colors.background.primary.toString()}
        />
        <Path
          d="M90 53H0V80H90V53Z"
          fill={theme.colors.background.primary.toString()}
        />
      </Svg>
    </>
  );
};

export default ShortHeader;
