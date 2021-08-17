import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTheme } from 'styled-components';

import Button from '../Button';
import Row from '../Row';
import Spacer from '../Spacer';
import Typography from '../Typography';

type Props = {
  text: string;
  onClick: () => void;
};

const AddDocumentButton: React.FC<Props> = ({ text, onClick }) => {
  const theme = useTheme();

  return (
    <Button onPress={onClick}>
      <Row alignItems="center">
        <Ionicons
          name="add-circle"
          color={theme.name === 'light' ? 'dark' : 'light'}
        />
        <Spacer width={8} />
        <Typography tag="h6">{text}</Typography>
      </Row>
    </Button>
  );
};

export default AddDocumentButton;
