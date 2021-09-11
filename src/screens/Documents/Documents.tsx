import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext } from 'react';
import styled, { useTheme } from 'styled-components';

import Button from '../../components/Button';
import Column from '../../components/Column';
import DocumentListItem, {
  AddDocumentButton,
} from '../../components/DocumentListItem';
import Row from '../../components/Row';
import Screen from '../../components/Screen';
import Spacer from '../../components/Spacer';
import Typography from '../../components/Typography';
import { UserContext } from '../../context/user/state';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { ProfileStackParamList } from '../../navigation/utils/paramLists/ProfileStack';
import { RAIL_SPACING } from '../../styles/spacing';
import { getMissingDocuments } from './utils';

const Container = styled(Column)`
  padding: 16px ${RAIL_SPACING}px;
`;

const Documents: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<ProfileStackParamList>>();

  const theme = useTheme();

  const { user } = useContext(UserContext);

  if (!user) return null;

  const documents = getMissingDocuments(user.kyc);

  const addDocuments = () => {
    navigation.push(SCREENS.UPLOAD_DOCUMENT, { documents });
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
        <Typography tag="p">
          Here you can upload documents so that we can verify your identity.
        </Typography>
        <Spacer height={16} />
        <DocumentListItem type="identification" />
        <Spacer height={16} />
        <DocumentListItem type="proofOfAddress" />
        <Spacer height={16} />
        {documents.length > 1 && (
          <Row justifyContent="center" fullWidth>
            <AddDocumentButton text="Add Documents" onPress={addDocuments} />
          </Row>
        )}
      </Container>
    </Screen>
  );
};

export default Documents;
