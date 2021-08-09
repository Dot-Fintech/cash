import { View } from 'react-native';
import styled from 'styled-components';

const Overlay = styled(View)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) =>
    theme.colors.background.primary.toString()};
`;

export default Overlay;
