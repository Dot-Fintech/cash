import Checkbox from 'expo-checkbox';
import React, { useContext, useState } from 'react';
import { Dimensions, Modal } from 'react-native';
import styled from 'styled-components';

import Button from '../../../components/Button';
import Column from '../../../components/Column';
import Row from '../../../components/Row';
import Spacer from '../../../components/Spacer';
import Typography from '../../../components/Typography';
import { UserContext } from '../../../context/user/state';
import {
  Reminder_Code,
  useAcknowledgeReminderMutation,
} from '../../../generated/graphql';

const RAIL_SPACING = 16;

const ModalContainer = styled(Column)`
  padding: 0 ${RAIL_SPACING}px;
  height: ${Dimensions.get('window').height}px;
`;

const RequestFromConnectionsModal: React.FC = () => {
  const { user } = useContext(UserContext);

  const [showModal, setShowModal] = useState<boolean>(
    user !== undefined &&
      !user.reminders.seen.includes(Reminder_Code.AppRequestFromConnections),
  );

  const [hideReminder, setHideReminder] = useState(false);

  const [acknowledgeReminder] = useAcknowledgeReminderMutation();

  const handleCloseModal = () => {
    if (hideReminder) {
      acknowledgeReminder({
        variables: { data: { code: Reminder_Code.AppRequestFromConnections } },
      });
    }
    setShowModal(false);
  };

  return (
    <Modal visible={showModal} onRequestClose={handleCloseModal}>
      <ModalContainer justifyContent="center" alignItems="center">
        <Typography tag="h1" textAlign="center">
          Requesting money
        </Typography>
        <Spacer height={32} />
        <Typography tag="p">
          You can only request money from users that you are already connected
          with. This restriction is in place to prevent users that you don't
          know from requesting money from you.
        </Typography>
        <Spacer height={32} />
        <Typography tag="p">
          To connect with another user, you can go to the explore page (by
          tapping on the compass down below) and then navigate to the people
          tab. There, you can search for users by their name or username and
          send them a connection request. If they accept, both of you will be
          able to request money from one another!
        </Typography>
        <Spacer height={32} />
        {/* <Row alignItems="center" fullWidth>
          <Checkbox value={hideReminder} onValueChange={setHideReminder} />
          <Spacer width={16} />
          <Typography tag="p">Don't show this reminder again</Typography>
        </Row> */}
        <Spacer height={32} />
        <Button onPress={handleCloseModal}>Okay</Button>
      </ModalContainer>
    </Modal>
  );
};

export default RequestFromConnectionsModal;
