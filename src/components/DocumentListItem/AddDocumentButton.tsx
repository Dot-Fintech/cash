import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTheme } from 'styled-components';

import Button from '../Button';
import Row from '../Row';
import Spacer from '../Spacer';
import Typography from '../Typography';

type Props = {
  text: string;
  onPress: () => void;
};

const AddDocumentButton: React.FC<Props> = ({ text, onPress }) => {
  const theme = useTheme();

  return (
    <Button onPress={onPress}>
      <Row alignItems="center">
        <Ionicons
          name="add-circle"
          size={32}
          color={theme.colors.text.primary.toString()}
        />
        <Spacer width={8} />
        <Typography tag="h6">{text}</Typography>
      </Row>
    </Button>
  );
};

export default AddDocumentButton;
