import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import styled, { css } from 'styled-components';

const containerStyles = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ClickableContainer = styled(TouchableOpacity)`
  margin: 0;
  padding: 0;
  ${containerStyles};
`;

const NonClickableContainer = styled(View)`
  ${containerStyles};
`;

type Props = TouchableOpacityProps;

const Container: React.FC<Props> = ({ onPress, children, ...props }) => {
  return onPress ? (
    <ClickableContainer onPress={onPress} {...props}>
      {children}
    </ClickableContainer>
  ) : (
    <NonClickableContainer>{children}</NonClickableContainer>
  );
};

export default Container;
