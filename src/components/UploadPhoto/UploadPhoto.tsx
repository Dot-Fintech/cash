import React, { useContext, useState } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';

import { UserContext } from '../../context/user/state';
import CheckedIcon from '../../icons/CheckedIcon';
import PhotoPicker from '../../screens/ProfilePhoto/PhotoPicker';
import { RAIL_SPACING } from '../../styles/spacing';
import { useUploadImage } from '../../utils/uploadImage';
import Button from '../Button';
import Column from '../Column';
import Photo from '../Photo';
import Row from '../Row';
import Spacer from '../Spacer';
import Typography from '../Typography';

const { width } = Dimensions.get('window');

const Container = styled(Column)`
  padding: 32px ${RAIL_SPACING}px 0;
`;

type Props = {
  title: string;
  description: string;
  compressedSize: number;
  action: {
    containerName: string;
    loading?: boolean;
    setPhoto: (photoId: string) => Promise<void>;
  };
  photo: {
    aspect: [number, number];
    circular?: boolean;
  };
  next: () => void;
};

const ProfilePhotoPage: React.FC<Props> = ({
  title,
  description,
  compressedSize,
  action,
  photo,
  next,
}) => {
  const { user } = useContext(UserContext);

  const [upload, uploadResult] = useUploadImage(compressedSize);

  const [uri, setUri] = useState<string>();
  const [success, setSuccess] = useState(false);

  const unsetImage = () => setUri(undefined);

  const handleSave = async () => {
    if (uri) {
      const blob = await (await fetch(uri)).blob();
      const file = new File([blob], `${user?._id}.jpg`, {
        type: 'image/jpeg',
        lastModified: Date.now(),
      });
      const photoId = await upload(file, action.containerName);
      if (photoId) {
        await action.setPhoto(photoId);
      }
      setSuccess(true);
      // show the success ui for 3s before navigating away
      setTimeout(next, 3000);
    }
  };

  const loading = uploadResult.loading || action.loading;

  return (
    <Container alignItems="center">
      <Typography tag="h3">{title}</Typography>
      <Spacer height={8} />
      <Typography tag="h6" textAlign="center">
        {description}
      </Typography>
      <Spacer height={32} />
      {!uri ? (
        <PhotoPicker aspect={photo.aspect} setUri={setUri} />
      ) : !success ? (
        <>
          <Photo size={width - 2 * RAIL_SPACING} uri={uri} {...photo} />
          <Spacer height={16} />
          <Row justifyContent="space-between" fullWidth>
            <Button onPress={unsetImage} disabled={loading}>
              Back
            </Button>
            <Button onPress={handleSave} disabled={loading}>
              Save
            </Button>
          </Row>
        </>
      ) : (
        <>
          <Typography tag="h2">Success!</Typography>
          <Spacer height={16} />
          <CheckedIcon height={300} maxWidth={width - 2 * RAIL_SPACING} />
        </>
      )}
    </Container>
  );
};

export default ProfilePhotoPage;
