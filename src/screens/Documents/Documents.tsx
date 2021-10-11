import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { Dimensions, FlatList, TouchableOpacity } from 'react-native';
import styled, { useTheme } from 'styled-components';

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
  Kyc_Document_Type,
  useGetKycDocumentsLazyQuery,
} from '../../generated/graphql';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { ProfileStackParamList } from '../../navigation/utils/paramLists/ProfileStack';
import { RAIL_SPACING } from '../../styles/spacing';

const { width } = Dimensions.get('window');

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
          <TouchableOpacity onPress={goBack}>
            <Ionicons
              icon="arrow-back"
              size={32}
              color={theme.colors.text.primary.toString()}
            />
          </TouchableOpacity>
          <Spacer width={16} />
          <Typography tag="h2">Documents</Typography>
        </Row>
        <Spacer height={16} />
        <Typography tag="p" textAlign="center">
          Here you can upload documents so that we can verify your identity.
        </Typography>
        <Spacer height={16} />
        {data ? (
          <FlatList
            data={actionableDocuments}
            keyExtractor={(document) => document._id}
            renderItem={({ item, index }) => (
              <>
                {index > 0 && <Spacer height={16} />}
                <DocumentListItem document={item} />
              </>
            )}
          />
        ) : loading ? (
          <LoadingList
            width={width - 2 * RAIL_SPACING}
            numRows={Object.keys(Kyc_Document_Type).length}
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
