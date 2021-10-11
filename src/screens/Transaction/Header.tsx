import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FormikProps } from 'formik';
import React from 'react';
import {
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeTouchEvent,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';

import Pill from '../../components/Pill';
import Row from '../../components/Row';
import Typography from '../../components/Typography';
import { P2P_Transaction_Type } from '../../generated/graphql';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { MoneyStackParamList } from '../../navigation/utils/paramLists/MoneyStack';
import { Colors } from '../../theme';
import { formatter } from '../../utils/money';
import { FormValues } from './types';

const ActionWrapper = styled(Row)`
  height: 52px;
`;

type Props = FormikProps<FormValues> & {
  amount: number;
  type: P2P_Transaction_Type;
  loading?: boolean;
};

const Header: React.FC<Props> = ({ amount, type, loading, handleSubmit }) => {
  const navigation =
    useNavigation<
      StackNavigationProp<MoneyStackParamList, SCREENS.TRANSACTION_WITH_AMOUNT>
    >();

  const goBack = () => navigation.pop();

  return (
    <Row justifyContent="space-between" fullWidth>
      <ActionWrapper alignItems="center">
        <TouchableOpacity onPress={goBack}>
          <Ionicons
            name="arrow-back"
            size={36}
            color={Colors.white.toString()}
          />
        </TouchableOpacity>
      </ActionWrapper>
      <ActionWrapper justifyContent="center" alignItems="center">
        <Typography tag="h4" color={Colors.white}>
          {formatter.format(amount)}
        </Typography>
      </ActionWrapper>
      <ActionWrapper justifyContent="flex-end" alignItems="center">
        {loading ? (
          <ActivityIndicator color={Colors.white.toString()} />
        ) : (
          <Pill
            onPress={
              handleSubmit as unknown as (
                e: NativeSyntheticEvent<NativeTouchEvent>,
              ) => void
            }
            variant="translucent"
          >
            {type === P2P_Transaction_Type.Send ? 'Send' : 'Request'}
          </Pill>
        )}
      </ActionWrapper>
    </Row>
  );
};

export default Header;
