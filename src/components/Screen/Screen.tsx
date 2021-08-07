import React from 'react';
import { SafeAreaView, View } from 'react-native';
import styled, { css } from 'styled-components';

const styles = css`
  width: 100%;
  height: 100%;
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
