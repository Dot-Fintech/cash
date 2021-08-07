import React from 'react';
import { Image } from 'react-native';
import styled, { css } from 'styled-components';

type StyledImageProps = {
  size: number;
  circular?: boolean;
};
const StyledImage = styled(Image)<StyledImageProps>`
  ${({ size }) => css`
    width: ${size}px;
    height: ${size}px;
  `}
  border-radius: ${({ circular, size }) => `${circular ? size / 2 : 0}px`};
`;

type Props = StyledImageProps & {
  uri: string;
};

const Photo: React.FC<Props> = ({ uri, ...props }) => {
  return <StyledImage source={{ uri }} {...props} />;
};

export default Photo;
