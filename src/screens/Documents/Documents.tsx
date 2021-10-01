import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import styled, { useTheme } from 'styled-components';

import Button from '../../components/Button';
import Column from '../../components/Column';
import DocumentListItem, {
  AddDocumentButton,
} from '../../components/DocumentListItem';
import Error from '../../components/Error';
import { LoadingList } from '../../components/Loading';
import Row from '../../components/Row';
import Screen from '../../components/Screen';
import Spacer from '../../components/Spacer';
import Typography from '../../components/Typography';
import {
  Kyc_Document_Status,
  useGetKycDocumentsLazyQuery,
} from '../../generated/graphql';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { ProfileStackParamList } from '../../navigation/utils/paramLists/ProfileStack';
import { RAIL_SPACING } from '../../styles/spacing';

const Container = styled(Column)`
  padding: 16px ${RAIL_SPACING}px;
`;

const Documents: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<ProfileStackParamList>>();

  const theme = useTheme();

  const [getKYCDocuments, { data, loading, error }] =
    useGetKycDocumentsLazyQuery();

  useEffect(() => getKYCDocuments(), []);

  const actionableDocuments =
    data?.getKYCDocuments.documents.filter(
      (document) => document.status === Kyc_Document_Status.Unverified,
    ) ?? [];

  const addDocuments = () => {
    navigation.push(SCREENS.UPLOAD_DOCUMENT, { actionableDocuments });
  };

  const goBack = () => navigation.pop();

  return (
    <Screen>
      <Container>
        <Row alignItems="center" fullWidth>
          <Button onPress={goBack}>
            <Ionicons
              icon="arrow-back"
              size={32}
              color={theme.colors.text.primary.toString()}
            />
          </Button>
          <Spacer width={16} />
          <Typography tag="h2">Documents</Typography>
        </Row>
        <Spacer height={16} />
        <Typography tag="p" textAlign="center">
          Here you can upload documents so that we can verify your identity.
        </Typography>
        <Spacer height={16} />
        {data ? (
          actionableDocuments.map((document, index) => (
            <Column key={document._id}>
              {index > 0 && <Spacer height={16} />}
              <DocumentListItem document={document} />
            </Column>
          ))
        ) : loading ? (
          <LoadingList
            width={Dimensions.get('window').width - 2 * RAIL_SPACING}
            numRows={3}
          />
        ) : error ? (
          <>
            <Spacer height={32} />
            <Column alignItems="center" fullWidth>
              <Error
                error={error}
                message="We can't get your documents right now."
              />
            </Column>
          </>
        ) : null}
        <Spacer height={16} />
        {actionableDocuments.length > 1 && (
          <Row justifyContent="center" fullWidth>
            <AddDocumentButton text="Add Documents" onPress={addDocuments} />
          </Row>
        )}
      </Container>
    </Screen>
  );
};

export default Documents;
