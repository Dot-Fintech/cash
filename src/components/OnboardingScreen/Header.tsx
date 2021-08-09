import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Path, Rect, Svg } from 'react-native-svg';
import { useTheme } from 'styled-components';

const HEADER_WIDTH = Dimensions.get('window').width;
const HEADER_BLOCK_HEIGHT = 120;

const Header: React.FC = () => {
  const theme = useTheme();

  const { top } = useSafeAreaInsets();

  const HEADER_HEIGHT = HEADER_BLOCK_HEIGHT + top;

  return (
    <>
      <StatusBar style={theme.name} />
      <Svg
        width={HEADER_WIDTH}
        height={HEADER_HEIGHT}
        viewBox={`0 0 ${HEADER_WIDTH} ${HEADER_HEIGHT}`}
        fill="none"
      >
        <Rect
          width="400"
          height="120"
          fill={theme.colors.main.secondary.toString()}
        />
        <Rect
          x="100"
          y="80"
          width="50"
          height="40"
          fill={theme.colors.background.primary.toString()}
        />
        <Path
          d="M50 40C56.5661 40 63.0679 41.0346 69.1342 43.0448C75.2005 45.055 80.7124 48.0014 85.3553 51.7157C89.9983 55.4301 93.6812 59.8396 96.194 64.6927C98.7067 69.5457 100 74.7471 100 80L50 80L50 40Z"
          fill={theme.colors.background.primary.toString()}
        />
        <Path
          d="M150 120C143.434 120 136.932 118.965 130.866 116.955C124.8 114.945 119.288 111.999 114.645 108.284C110.002 104.57 106.319 100.16 103.806 95.3073C101.293 90.4543 100 85.2529 100 80L150 80L150 120Z"
          fill={theme.colors.main.secondary.toString()}
        />
        <Rect
          y="40"
          width="50"
          height="40"
          fill={theme.colors.background.primary.toString()}
        />
        <Rect
          y="80"
          width="100"
          height="40"
          fill={theme.colors.background.primary.toString()}
        />
      </Svg>
    </>
  );
};

export default Header;
