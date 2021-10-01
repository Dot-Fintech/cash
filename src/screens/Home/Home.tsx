import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext } from 'react';
import styled, { useTheme } from 'styled-components';

import Column from '../../components/Column';
import MainHeader from '../../components/MainHeader';
import Screen from '../../components/Screen';
import Spacer from '../../components/Spacer';
import Typography from '../../components/Typography';
import { UserContext } from '../../context/user/state';
import { UserListItemFragment } from '../../generated/graphql';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { HomeStackParamList } from '../../navigation/utils/paramLists/HomeStack';
import { RAIL_SPACING } from '../../styles/spacing';
import { formatter } from '../../utils/money';
import People from './People';
import Transactions from './Transactions';

const Container = styled(Column)`
  padding: 8px ${RAIL_SPACING}px 0;
`;

const Home: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<HomeStackParamList, SCREENS.HOME>>();

  const theme = useTheme();

  const { user } = useContext(UserContext);

  const goToUser = (user: UserListItemFragment) =>
    navigation.push(SCREENS.USER_SUMMARY, { username: user.username });

  return (
    <Screen>
      <MainHeader iconColor={theme.colors.text.primary} />
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
      </Container>
      <Spacer height={16} />
      <People goToUser={goToUser} />
      <Spacer height={16} />
      <Transactions />
    </Screen>
  );
};

export default Home;
