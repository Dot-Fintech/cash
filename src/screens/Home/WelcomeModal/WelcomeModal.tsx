import React, { useContext, useState } from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components';

import Button from '../../../components/Button';
import Column from '../../../components/Column';
import Logo from '../../../components/Logo';
import Spacer from '../../../components/Spacer';
import Typography from '../../../components/Typography';
import { UserContext } from '../../../context/user/state';
import {
  Reminder_Code,
  useAcknowledgeReminderMutation,
} from '../../../generated/graphql';
import { RAIL_SPACING } from '../../../styles/spacing';

const ModalContainer = styled(Column)`
  padding: 0 ${RAIL_SPACING}px;
  height: 100vh;
`;

const WelcomeModal: React.FC = () => {
  const { user } = useContext(UserContext);

  const [showModal, setShowModal] = useState<boolean>(
    user !== undefined &&
      !user.reminders.seen.includes(Reminder_Code.AppWelcome),
  );

  const [acknowledgeReminder] = useAcknowledgeReminderMutation();

  const handleCloseModal = () => {
    acknowledgeReminder({
      variables: { data: { code: Reminder_Code.AppWelcome } },
    });
    setShowModal(false);
  };

  return (
    <Modal
      visible={showModal}
      onDismiss={handleCloseModal}
      animationType="slide"
    >
      <ModalContainer justifyContent="center" alignItems="center">
        <Typography tag="h1">Welcome!</Typography>
        <Spacer height={32} />
        <Logo size={52} />
        <Spacer height={32} />
        <Column fullWidth>
          <Typography tag="p">
            Welcome to the Dot Demo! This app showcases a subset of features
            that will be available for the initial release of Dot.
          </Typography>
          <Spacer height={32} />
          <Typography tag="p">
            In this demo, you'll be able to connect with other users with demo
            access and send or request money from them. There are also some
            other neat features sprinkled in!
          </Typography>
          <Spacer height={32} />
          <Typography tag="p">
            We've given you $1000.000 to play around with.
          </Typography>
        </Column>
        <Spacer height={32} />
        <Button onPress={handleCloseModal}>Okay</Button>
      </ModalContainer>
    </Modal>
  );
};

export default WelcomeModal;
