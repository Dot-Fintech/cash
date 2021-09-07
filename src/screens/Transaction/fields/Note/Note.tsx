import { FormikProps } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import styled, { useTheme } from 'styled-components';

import Row from '../../../../components/Row';
import Spacer from '../../../../components/Spacer';
import TextField from '../../../../components/TextField';
import Typography from '../../../../components/Typography';
import { FormValues } from '../../types';
import {
  LABEL_SPACER_WIDTH,
  LABEL_WRAPPER_WIDTH,
  TEXT_FIELD_WIDTH,
} from '../utils';

const LabelWrapper = styled(View)`
  width: ${LABEL_WRAPPER_WIDTH}px;
`;

const TextFieldWrapper = styled(View)`
  width: ${TEXT_FIELD_WIDTH}px;
`;

type Props = FormikProps<FormValues> & {
  hideField: boolean;
  variant?: 'default' | 'white';
};

const Note: React.FC<Props> = ({ hideField, variant = 'default' }) => {
  const theme = useTheme();

  const color = variant === 'white' ? Colors.white : undefined;

  return (
    <Row alignItems="center" fullWidth>
      <LabelWrapper>
        <Typography tag="h5" color={color}>
          Note
        </Typography>
      </LabelWrapper>
      <Spacer width={LABEL_SPACER_WIDTH} />
      {!hideField && (
        <TextFieldWrapper>
          <TextField
            placeholder="Dinner, movies, drinks"
            color={color}
            borderColor={color ?? theme.colors.text.primary}
          />
        </TextFieldWrapper>
      )}
    </Row>
  );
};

export default Note;
