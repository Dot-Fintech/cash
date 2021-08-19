import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { useContext } from 'react';
import { Button } from 'react-native';
import styled from 'styled-components';

import Column from '../../components/Column';
import { HEADER_HEIGHT } from '../../components/MainHeader/MainHeader';
import Screen from '../../components/Screen';
import Spacer from '../../components/Spacer';
import Typography from '../../components/Typography';
import { UserContext } from '../../context/user/state';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { HomeStackParamList } from '../../navigation/utils/screenConfigs/HomeStack';
import { RAIL_SPACING } from '../../styles/spacing';
import { formatter } from '../../utils/money';

const Container = styled(Column)`
  padding: ${HEADER_HEIGHT + 8}px ${RAIL_SPACING}px 0;
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
          <Typography tag="h6">Welcome back, {user?.firstName}</Typography>
          <Spacer height={16} />
          <Typography tag="h2">
            {formatter.format(user?.primaryAccount.balance ?? 0)}
          </Typography>
          {user?.primaryAccount.frozen && (
            <>
              <Spacer height={8} />
              <Ionicons name="snow" size={36} />
            </>
          )}
        </Column>
        <Spacer height={16} />
        <Button title="User" onPress={goToUser} />
      </Container>
    </Screen>
  );
};

export default Home;
