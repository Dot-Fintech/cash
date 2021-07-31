import React from 'react';
import { useTheme } from 'styled-components';

import Column from '../Column';
import Typography from '../Typography';

const FormValidationError: React.FC = ({ children }) => {
  const theme = useTheme();

  return (
    <Column alignItems="flex-start" fullWidth>
      <Typography tag="p" color={theme.colors.error.primary}>
        {children}
      </Typography>
    </Column>
  );
};

export default FormValidationError;
