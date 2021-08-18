import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components';

import ShortHeader from './ShortHeader';
import TallHeader from './TallHeader';

const Header: React.FC = () => {
  const theme = useTheme();

  const { top } = useSafeAreaInsets();

  return (
    <>
      <StatusBar style={theme.name} />
      {top > 20 ? <TallHeader /> : <ShortHeader />}
    </>
  );
};

export default Header;
