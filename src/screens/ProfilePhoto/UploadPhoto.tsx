import React, { useContext, useState } from 'react';
import styled, { useTheme } from 'styled-components';

import Button from '../../components/Button';
import Column from '../../components/Column';
import Photo from '../../components/Photo';
import Row from '../../components/Row';
import Spacer from '../../components/Spacer';
import Typography from '../../components/Typography';
import { UserContext } from '../../context/user/state';
import CheckedIcon from '../../icons/CheckedIcon';
import { useUploadImage } from '../../utils/uploadImage';
import PhotoPicker from './PhotoPicker';

const RAIL_SPACING = 16;

const Container = styled(Column)`
  padding: 0 ${RAIL_SPACING}px 0;
`;

type Props = {
  title: string;
  description: string;
  compressedSize: number;
  canSkip?: boolean;
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
  canSkip,
  action,
  photo,
  next,
}) => {
  const theme = useTheme();

  const { user } = useContext(UserContext);

  const [upload, uploadResult] = useUploadImage(compressedSize);

  const [uri, setUri] = useState<string>();
  const [success, setSuccess] = useState(false);

  const unsetImage = () => setUri(undefined);

  const handleSave = async () => {
    if (uri) {
      const blob = await (await fetch(uri)).blob();
      const file = new File([blob], `${user?._id}.png`, {
        type: 'image/png',
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
        <>
          <PhotoPicker aspect={photo.aspect} setUri={setUri} />
          {canSkip && (
            <>
              <Spacer height={16} />
              <Button onPress={next}>
                <Typography tag="h6" color={theme.colors.main.secondary}>
                  Skip
                </Typography>
              </Button>
            </>
          )}
        </>
      ) : !success ? (
        <>
          <Photo
            size={window.innerWidth - 2 * RAIL_SPACING}
            uri={uri}
            {...photo}
          />
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
          <CheckedIcon
            height={300}
            maxWidth={window.innerWidth - 2 * RAIL_SPACING}
          />
        </>
      )}
    </Container>
  );
};

export default ProfilePhotoPage;
