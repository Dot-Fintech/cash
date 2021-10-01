import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import Screen from '../../components/Screen';
import UploadPhoto from '../../components/UploadPhoto';
import {
  Kyc_Document_Type,
  useUploadDocumentMutation,
} from '../../generated/graphql';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { ProfileStackParamList } from '../../navigation/utils/paramLists/ProfileStack';
import { getPageDetails } from './utils';

const UploadDocuments: React.FC = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ProfileStackParamList, SCREENS.UPLOAD_DOCUMENT>
    >();

  const route =
    useRoute<RouteProp<ProfileStackParamList, SCREENS.UPLOAD_DOCUMENT>>();

  const [uploadDocument, { loading }] = useUploadDocumentMutation();

  const { actionableDocuments } = route.params;

  if (actionableDocuments.length === 0) navigation.pop();

  const document = actionableDocuments[0];

  const containerName =
    document.type === Kyc_Document_Type.Identification
      ? 'kycidentification'
      : 'kycproofofaddress';

  const setPhoto = async (photoId: string) => {
    const { errors } = await uploadDocument({
      variables: {
        data: {
          photoId,
          documentId: document._id,
          containerName,
        },
      },
    });
    if (errors) {
      alert('Something went wrong while uploading your document');
    }
  };

  const next = () => {
    if (actionableDocuments.length > 1) {
      navigation.push(SCREENS.UPLOAD_DOCUMENT, {
        actionableDocuments: actionableDocuments.slice(1),
      });
    } else {
      navigation.navigate(SCREENS.PROFILE);
    }
  };

  return (
    <Screen>
      <UploadPhoto
        {...getPageDetails(document.type)}
        compressedSize={500}
        action={{
          containerName,
          loading,
          setPhoto,
        }}
        photo={{ aspect: [3, 4], circular: true }}
        next={next}
      />
    </Screen>
  );
};

export default UploadDocuments;
