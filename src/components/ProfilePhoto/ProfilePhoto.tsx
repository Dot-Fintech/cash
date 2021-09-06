import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTheme } from 'styled-components';

import { Colors } from '../../theme';
import Photo from '../Photo';

type Props = {
  size: number;
  uri?: string | null;
  style?: 'light' | 'dark';
};

const ProfilePhoto: React.FC<Props> = ({ size, uri, style }) => {
  const theme = useTheme();

  return uri ? (
    <Photo size={size} uri={uri} circular />
  ) : (
    <Ionicons
      name="person"
      size={size}
      color={
        style
          ? style === 'light'
            ? Colors.white.toString()
            : Colors.black.toString()
          : theme.colors.text.primary.toString()
      }
    />
  );
};

export default ProfilePhoto;
