import { Text } from 'react-native';
import styled, { css } from 'styled-components';

import type { Color, ThemeTypography } from '../../theme';

type Props = {
  tag: keyof ThemeTypography;
  color?: Color;
  textTransform?: 'capitalize' | 'lowercase' | 'uppercase';
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  textDecoration?: 'underline';
};

const Typography = styled(Text)<Props>`
  margin: 0;
  ${({ tag, color, textTransform, textAlign, textDecoration, theme }) => css`
    color: ${color ? color.toString() : theme.colors.text.primary.toString()};
    text-transform: ${textTransform ?? 'none'};
    text-align: ${textAlign ?? 'left'};
    text-decoration: ${textDecoration ?? 'none'};

    font-family: ${theme.typography[tag].fontFamily};
    font-size: ${theme.typography[tag].fontSize}px;
    font-weight: ${theme.typography[tag].fontWeight};
    line-height: ${theme.typography[tag].lineHeight}px;
    letter-spacing: ${theme.typography[tag].letterSpacing}px;
  `}
`;

export default Typography;
