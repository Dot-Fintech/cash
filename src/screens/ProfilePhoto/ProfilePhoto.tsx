import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import { useChangeProfilePhotoMutation } from '../../generated/graphql';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { SignUpStackParamList } from '../../navigation/utils/screenConfigs/SignUpStack';
import UploadPhoto from './UploadPhoto';

const containerName = 'userprofilephotos';

type Props = {
  next: () => void;
};

const SetProfilePhoto: React.FC<Props> = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<SignUpStackParamList, SCREENS.SET_PROFILE_PHOTO>
    >();

  const [changeProfilePhoto, { loading }] = useChangeProfilePhotoMutation();

  const setPhoto = async (photoId: string) => {
    const { errors } = await changeProfilePhoto({
      variables: { data: { photoId, containerName } },
    });
    if (errors) {
      alert('Something went wrong while changing your profile picture.');
    }
  };

  const goToSafety = () => navigation.push(SCREENS.SAFETY);

  return (
    <UploadPhoto
      title="Profile Photo"
      description="Let people know who you are. Upload a picture of yourself."
      compressedSize={100}
      canSkip
      action={{
        containerName,
        loading,
        setPhoto,
      }}
      photo={{ aspect: [1, 1], circular: true }}
      next={goToSafety}
    />
  );
};

export default SetProfilePhoto;
