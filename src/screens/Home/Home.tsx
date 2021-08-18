import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { useContext } from 'react';
import { Button } from 'react-native';
import styled from 'styled-components';

import Column from '../../components/Column';
import Screen from '../../components/Screen';
import Spacer from '../../components/Spacer';
import Typography from '../../components/Typography';
import { UserContext } from '../../context/user/state';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { HomeStackParamList } from '../../navigation/utils/screenConfigs/HomeStack';
import { RAIL_SPACING } from '../../styles/spacing';

const Container = styled(Column)`
  padding: 16px ${RAIL_SPACING}px;
`;

const Home: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<HomeStackParamList, SCREENS.HOME>>();

  const { user } = useContext(UserContext);

  const goToUser = () => navigation.push(SCREENS.USER_SUMMARY, { userId: '1' });

  return (
    <Screen>
      <Container>
        <Column alignItems="center" fullWidth>
          <Typography tag="h5">Welcome back {user?.firstName}</Typography>
          <Spacer height={8} />
          <Typography tag="h3">{user?.primaryAccount.balance}</Typography>
        </Column>
        <Spacer height={16} />
        <Button title="User" onPress={goToUser} />
      </Container>
    </Screen>
  );
};

export default Home;
