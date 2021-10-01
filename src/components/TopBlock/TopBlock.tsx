import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions } from 'react-native';
import styled, { useTheme } from 'styled-components';

const { width } = Dimensions.get('window');

export const TOP_BLOCK_HEIGHT = 286;

const Container = styled(LinearGradient)`
  position: absolute;
  top: 0;
  width: ${width}px;
  height: ${TOP_BLOCK_HEIGHT}px;
`;

const TopBlock: React.FC = ({ children }) => {
  const theme = useTheme();

  return (
    <Container
      colors={[
        theme.colors.main.primary.toString(),
        theme.colors.main.secondary.toString(),
      ]}
    >
      {children}
    </Container>
  );
};

export default TopBlock;
