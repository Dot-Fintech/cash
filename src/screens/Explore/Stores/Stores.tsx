import React from 'react';
import { Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import styled from 'styled-components';

import Screen from '../../../components/Screen';
import { SCREENS } from '../../../navigation/utils/enums/screens';
import SearchGroup from '../SearchGroup';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 10.6572678;
const LONGITUDE = -61.5180173;
const LATITUDE_DELTA = 0.6;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = styled(MapView)`
  width: ${width}px;
  height: ${height}px;
`;

const Stores: React.FC = () => {
  return (
    <Screen unsafe>
      <SearchGroup screen={SCREENS.EXPLORE_STORES} />
      <Map
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      />
    </Screen>
  );
};

export default Stores;
