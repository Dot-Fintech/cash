import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Button } from 'react-native';
import styled from 'styled-components';

import Column from '../../components/Column';
import Screen from '../../components/Screen';
import Spacer from '../../components/Spacer';
import Typography from '../../components/Typography';
import { NAVIGATORS } from '../../navigation/utils/enums/navigators';
import { RootStackParamList } from '../../navigation/utils/screenConfigs/RootStack';

const RAIL_SPACING = 16;

const Container = styled(Column)`
  padding: 0 ${RAIL_SPACING}px;
`;

const Biometrics: React.FC = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, NAVIGATORS.MAIN_STACK>
    >();

  const goToMain = () => navigation.navigate(NAVIGATORS.MAIN_STACK);

  return (
    <Screen>
      <Container alignItems="center">
        <Typography tag="h3">Even more secure</Typography>
        <Spacer height={16} />
        <Typography tag="p" textAlign="center">
          Make your account even more secure by using your face or fingerprint
          to log into the app.
        </Typography>
        <Spacer height={16} />
        <Button title="Main" onPress={goToMain} />
      </Container>
    </Screen>
  );
};

export default Biometrics;
