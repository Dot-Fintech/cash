import React from 'react';
import { Alert } from 'react-native';

import UploadPhoto from '../../components/UploadPhoto/';
import { useChangeProfilePhotoMutation } from '../../generated/graphql';

const containerName = 'userprofilephotos';

type Props = {
  next: () => void;
};

const ProfilePhoto: React.FC<Props> = ({ next }) => {
  const [changeProfilePhoto, { loading }] = useChangeProfilePhotoMutation();

  const setPhoto = async (photoId: string) => {
    const { errors } = await changeProfilePhoto({
      variables: { data: { photoId, containerName } },
    });
    if (errors) {
      Alert.alert(
        'Hmm',
        'Something went wrong while changing your profile picture.',
      );
    }
  };

  return (
    <UploadPhoto
      title="Profile Photo"
      description="Let people know who you are. Upload a picture of yourself."
      compressedSize={100}
      action={{
        containerName,
        loading,
        setPhoto,
      }}
      photo={{ aspect: [1, 1], circular: true }}
      next={next}
    />
  );
};

export default ProfilePhoto;
