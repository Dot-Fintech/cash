import { ApolloError } from '@apollo/client';
import React from 'react';

import Column from '../Column';
import Spacer from '../Spacer';
import Typography from '../Typography';

type Props = {
  error: ApolloError;
  message: string;
};

const Error: React.FC<Props> = ({ error, message }) => {
  return (
    <Column alignItems="center" fullWidth>
      <Typography tag="h4" textAlign="center">
        Hmm. Something went wrong
      </Typography>
      <Spacer width={16} />
      <Typography tag="h5" textAlign="center">
        {message}
      </Typography>
      <Spacer height={16} />
      <Typography tag="h6" textAlign="center">
        Try again later :(
      </Typography>
      {process.env.NODE_ENV === 'development' && (
        <>
          <Spacer height={16} />
          <Typography tag="p" textAlign="center">
            {error.message}
          </Typography>
        </>
      )}
    </Column>
  );
};

export default Error;
