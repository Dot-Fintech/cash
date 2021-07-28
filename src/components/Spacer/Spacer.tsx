import { View } from 'react-native';
import styled from 'styled-components';

type Props = {
  width?: number;
  height?: number;
};

const Spacer = styled(View)<Props>`
  min-width: ${({ width = 1 }) => width}px;
  min-height: ${({ height = 1 }) => height}px;
`;

export default Spacer;
