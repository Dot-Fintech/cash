import { View } from 'react-native';
import styled, { css } from 'styled-components';

import type { AlignmentValue } from './types';

export type Props = {
  flexDirection: 'column' | 'row';
  flexShrink?: number;
  justifyContent?: AlignmentValue;
  alignItems?: AlignmentValue;
  fullWidth?: boolean;
};

/** DO NOT USE THIS COMPONENT. Use Row and Column instead */
const Flex = styled(View)<Props>`
  display: flex;
  ${({
    flexDirection,
    flexShrink,
    justifyContent,
    alignItems,
    fullWidth,
  }) => css`
    flex-shrink: ${flexShrink ?? 1};
    flex-direction: ${flexDirection};
    justify-content: ${justifyContent ?? 'flex-start'};
    align-items: ${alignItems ?? 'flex-start'};
    width: ${fullWidth ? '100%' : 'auto'};
  `}
`;

export default Flex;
