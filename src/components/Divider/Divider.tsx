import { View } from 'react-native';
import styled from 'styled-components';

type Props = {
  width: number;
};

const Divider = styled(View)<Props>`
  width: ${({ width }) => width}px;
  height: 2px;
  background-color: ${({ theme }) =>
    theme.colors.background.secondary.toString()};
  margin: 0;
`;

export default Divider;
