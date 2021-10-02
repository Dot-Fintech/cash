import { View } from 'react-native';
import styled from 'styled-components';

import { TAB_BAR_HEIGHT } from '../../navigation/MainTabs/TabBar';

type Props = {
  bottomInset: number;
};

const FinalBlock = styled(View)<Props>`
  height: ${({ bottomInset }) => bottomInset + TAB_BAR_HEIGHT + 16}px;
`;

export default FinalBlock;
