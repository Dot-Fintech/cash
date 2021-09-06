import React from 'react';
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

const LabelWrapper = styled.div`
  width: ${LABEL_WRAPPER_WIDTH}px;
`;

const SelectedUserWrapper = styled(Column)`
  min-height: 48px;
`;

type Props = {
  user: UserListItemFragment;
};

const FilledUser: React.FC<Props> = ({ user }) => {
  return (
    <Row alignItems="center" fullWidth>
      <LabelWrapper>
        <Typography tag="h5" color={Colors.white}>
          To
        </Typography>
      </LabelWrapper>
      <Spacer width={LABEL_SPACER_WIDTH} />
      <SelectedUserWrapper justifyContent="center" fullWidth>
        <Typography tag={NAME_TAG} color={Colors.white}>
          {user.firstName} {user.lastName}
        </Typography>
        <Typography tag={USERNAME_TAG} color={Colors.white}>
          @{user.username}
        </Typography>
      </SelectedUserWrapper>
    </Row>
  );
};

export default FilledUser;
