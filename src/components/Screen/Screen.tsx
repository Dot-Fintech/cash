import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { Dimensions } from 'react-native';
import { SafeAreaView, View } from 'react-native';
import styled, { css } from 'styled-components';

import { ThemeContext } from '../../theme';

const { width, height } = Dimensions.get('window');

const styles = css`
  width: ${width}px;
  height: ${height}px;
  background-color: ${({ theme }) =>
    theme.colors.background.primary.toString()};
`;

const Safe = styled(SafeAreaView)`
  ${styles}
`;

const Unsafe = styled(View)`
  ${styles}
`;

type Props = {
  unsafe?: boolean;
};

const Screen: React.FC<Props> = ({ unsafe, children }) => {
  const { theme } = useContext(ThemeContext);

  return unsafe ? (
    <Unsafe>{children}</Unsafe>
  ) : (
    <>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <Safe>{children}</Safe>
    </>
  );
};

export default Screen;
