import React from 'react';
import { Dimensions } from 'react-native';
import { SafeAreaView, View } from 'react-native';
import styled, { css } from 'styled-components';

const styles = css`
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').height}px;
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
  return unsafe ? <Unsafe>{children}</Unsafe> : <Safe>{children}</Safe>;
};

export default Screen;
