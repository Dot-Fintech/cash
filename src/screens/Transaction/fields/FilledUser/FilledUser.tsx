import React from 'react';
import { View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import styled from 'styled-components';

import Column from '../../../../components/Column';
import Row from '../../../../components/Row';
import Spacer from '../../../../components/Spacer';
import Typography from '../../../../components/Typography';
import type { UserListItemFragment } from '../../../../generated/graphql';
import { LABEL_SPACER_WIDTH, LABEL_WRAPPER_WIDTH } from '../utils';

export const NAME_TAG = 'h4';
export const USERNAME_TAG = 'p';

const LabelWrapper = styled(View)`
  width: ${LABEL_WRAPPER_WIDTH}px;
`;

const SelectedUserWrapper = styled(Column)`
  min-height: 48px;
`;

type Props = {
  user: UserListItemFragment;
  variant?: 'default' | 'white';
};

const FilledUser: React.FC<Props> = ({ user, variant = 'default' }) => {
  const color = variant === 'white' ? Colors.white : undefined;

  return (
    <Row alignItems="center" fullWidth>
      <LabelWrapper>
        <Typography tag="h5" color={color}>
          To
        </Typography>
      </LabelWrapper>
      <Spacer width={LABEL_SPACER_WIDTH} />
      <SelectedUserWrapper justifyContent="center" fullWidth>
        <Typography tag={NAME_TAG} color={color}>
          {user.firstName} {user.lastName}
        </Typography>
        <Typography tag={USERNAME_TAG} color={color}>
          @{user.username}
        </Typography>
      </SelectedUserWrapper>
    </Row>
  );
};

export default FilledUser;
