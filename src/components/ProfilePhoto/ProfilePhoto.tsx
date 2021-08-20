import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTheme } from 'styled-components';

import Photo from '../Photo';

type Props = {
  size: number;
  uri?: string | null;
};

const ProfilePhoto: React.FC<Props> = ({ size, uri }) => {
  const theme = useTheme();

  return uri ? (
    <Photo size={size} uri={uri} circular />
  ) : (
    <Ionicons
      name="person"
      size={size}
      color={theme.colors.text.primary.toString()}
    />
  );
};

export default ProfilePhoto;
