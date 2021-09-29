import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { ActivityIndicator, Alert, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled, { useTheme } from 'styled-components';

import BottomBlock from '../../components/BottomBlock';
import Button from '../../components/Button';
import Column from '../../components/Column';
import Divider from '../../components/Divider';
import MainHeader from '../../components/MainHeader';
import Pill from '../../components/Pill';
import ProfilePhoto from '../../components/ProfilePhoto';
import Row from '../../components/Row';
import Screen from '../../components/Screen';
import Spacer from '../../components/Spacer';
import TopBlock from '../../components/TopBlock';
import Typography from '../../components/Typography';
import { UserContext } from '../../context/user/state';
import { useLogoutMutation } from '../../generated/graphql';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { ProfileStackParamList } from '../../navigation/utils/paramLists/ProfileStack';
import { RootStackParamList } from '../../navigation/utils/paramLists/RootStack';
import TokenStore from '../../stores/TokenStore';
import { RAIL_SPACING } from '../../styles/spacing';
import { Colors, ThemeContext } from '../../theme';

type TopContainerProps = {
  topInset: number;
};
const TopContainer = styled(Column)<TopContainerProps>`
  padding-top: ${({ topInset }) => topInset}px;
  height: 100%;
`;

const BottomContainer = styled(Column)`
  padding: 0 ${RAIL_SPACING}px;
`;

const Profile: React.FC = () => {
  const profileStackNavigation =
    useNavigation<
      StackNavigationProp<ProfileStackParamList, SCREENS.PROFILE>
    >();
  const rootStackNavigation =
    useNavigation<StackNavigationProp<RootStackParamList>>();

  const theme = useTheme();

  const { top } = useSafeAreaInsets();

  const goToProfilePhoto = () =>
    profileStackNavigation.push(SCREENS.CHANGE_PROFILE_PHOTO);
  const goToDocuments = () => profileStackNavigation.push(SCREENS.DOCUMENTS);

  const { setTheme } = useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);

  const [logout, { loading }] = useLogoutMutation();

  const setLightTheme = () => setTheme('light');
  const setDarkTheme = () => setTheme('dark');

  const handleLogout = async () => {
    const { errors } = await logout();
    if (errors)
      return Alert.alert(
        'Something went wrong',
        'We encountered an issue while trying to log you out.',
      );
    await TokenStore.setTokens();
    setUser();
    rootStackNavigation.navigate(SCREENS.LANDING);
  };

  return (
    <Screen>
      <TopBlock>
        <TopContainer topInset={top} alignItems="center" fullWidth>
          <MainHeader iconColor={Colors.white} />
          <Spacer height={8} />
          <ProfilePhoto size={100} uri={user?.profilePhotoUrl} />
          <Spacer height={16} />
          <Pill onPress={goToProfilePhoto} variant="translucent">
            Change Profile Picture
          </Pill>
        </TopContainer>
      </TopBlock>
      <BottomBlock>
        <BottomContainer>
          <Spacer height={16} />
          <Typography tag="p" color={theme.colors.text.secondary}>
            Theme
          </Typography>
          <Spacer height={8} />
          <Button disabled={loading} onPress={setLightTheme}>
            <Typography tag="h5" textAlign="left">
              Light
            </Typography>
          </Button>
          <Spacer height={8} />
          <Divider width={Dimensions.get('window').width - 2 * RAIL_SPACING} />
          <Spacer height={8} />
          <Button disabled={loading} onPress={setDarkTheme}>
            <Typography tag="h5" textAlign="left">
              Dark
            </Typography>
          </Button>
          <Spacer height={16} />
          <Typography tag="p" color={theme.colors.text.secondary}>
            Documents
          </Typography>
          <Spacer height={8} />
          <Button disabled={loading} onPress={goToDocuments}>
            <Typography tag="h5" textAlign="left">
              My Documents
            </Typography>
          </Button>
          <Spacer height={16} />
          <Typography tag="p" color={theme.colors.text.secondary}>
            Account
          </Typography>
          <Spacer height={8} />
          <Row justifyContent="space-between" fullWidth>
            {loading ? (
              <ActivityIndicator
                color={theme.colors.main.secondary.toString()}
              />
            ) : (
              <Button onPress={handleLogout}>
                <Typography tag="h5" textAlign="left">
                  Logout
                </Typography>
              </Button>
            )}
          </Row>
        </BottomContainer>
      </BottomBlock>
    </Screen>
  );
};

export default Profile;
