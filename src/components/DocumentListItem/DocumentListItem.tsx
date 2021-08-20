import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import styled, { useTheme } from 'styled-components';

import { UserContext } from '../../context/user/state';
import { FullUserFragment, Kyc_Document_Status } from '../../generated/graphql';
import { RAIL_SPACING } from '../../styles/spacing';
import Column from '../Column';
import Row from '../Row';
import Spacer from '../Spacer';
import Typography from '../Typography';
import AddDocumentButton from './AddDocumentButton';
import { formatStatus, getTitle } from './utils';

const Container = styled(TouchableOpacity)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: none;
`;

const NotesWrapper = styled(Column)`
  width: calc(100% - ${2 * RAIL_SPACING}px);
  padding: 0 ${RAIL_SPACING}px;
`;

type Props = {
  type: keyof Omit<FullUserFragment['kyc'], '__typename'>;
};

const DocumentListItem: React.FC<Props> = ({ type }) => {
  const theme = useTheme();

  const { user } = useContext(UserContext);

  const [showNotes, setShowNotes] = useState(false);

  if (!user) return null;

  const { notes, status } = user.kyc[type];

  const toggleShowNotes = () => setShowNotes(!showNotes);

  const addDocument = () => null;

  return (
    <>
      <Container
        onPress={toggleShowNotes}
        disabled={status !== Kyc_Document_Status.Unverified || !notes}
      >
        <Row alignItems="center">
          <Ionicons
            name="document"
            color={theme.name === 'light' ? 'dark' : 'light'}
          />
          <Spacer width={16} />
          <Column>
            <Typography tag="h4">{getTitle(type)}</Typography>
            {status !== Kyc_Document_Status.Unverified && (
              <Typography
                tag="p"
                color={
                  status === Kyc_Document_Status.Verified
                    ? theme.colors.success.primary
                    : theme.colors.text.primary
                }
              >
                {formatStatus(status)}
              </Typography>
            )}
          </Column>
        </Row>
        {status === Kyc_Document_Status.Unverified &&
          (!notes ? null : showNotes ? (
            <Column>
              <Spacer height={8} />
              <Ionicons
                name="arrow-up"
                color={theme.name === 'light' ? 'dark' : 'light'}
              />
            </Column>
          ) : (
            <Column>
              <Ionicons
                name="arrow-down"
                color={theme.name === 'light' ? 'dark' : 'light'}
              />
              <Spacer height={8} />
            </Column>
          ))}
      </Container>
      {showNotes && (
        <>
          <Spacer height={8} />
          <NotesWrapper>
            <Typography tag="h6">Notes</Typography>
            <Spacer height={4} />
            <Typography tag="p">{notes}</Typography>
          </NotesWrapper>
          <Spacer height={16} />
          <Row justifyContent="center" fullWidth>
            <AddDocumentButton text="Resubmit Document" onClick={addDocument} />
          </Row>
        </>
      )}
    </>
  );
};

export default DocumentListItem;
