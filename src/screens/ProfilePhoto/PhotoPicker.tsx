import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import styled, { useTheme } from 'styled-components';

import Spacer from '../../components/Spacer';
import Typography from '../../components/Typography';

const RAIL_SPACING = 16;

const Container = styled(TouchableOpacity)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  padding: 16px ${RAIL_SPACING}px;
  background-color: ${({ theme }) =>
    theme.colors.background.secondary.toString()};
  border-radius: 24px;
`;

type Props = {
  aspect: [number, number];
  setUri: (uri: string) => void;
};

const PhotoPicker: React.FC<Props> = ({ aspect, setUri }) => {
  const theme = useTheme();

  useEffect(() => {
    (async () => {
      if (!Constants.platform?.web) {
        const cameraRollStatus =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (cameraRollStatus.status !== 'granted') {
          alert('Sorry, we need these permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect,
      quality: 1,
    });

    if (!result.cancelled) {
      setUri(result.uri);
    }
  };

  return (
    <Container onPress={pickImage}>
      <Typography tag="h5" textAlign="center">
        Tap here to upload an image
      </Typography>
      <Spacer />
      <Ionicons
        color={theme.colors.text.primary.toString()}
        name="add"
        size={32}
      />
    </Container>
  );
};

export default PhotoPicker;
