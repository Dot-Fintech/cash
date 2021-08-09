import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import React, { useContext, useState } from 'react';
import {
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeTouchEvent,
} from 'react-native';
import styled, { useTheme } from 'styled-components';

import Banner from '../../components/Banner';
import Button from '../../components/Button';
import Column from '../../components/Column';
import FormValidationError from '../../components/FormValidationError';
import OnboardingScreen from '../../components/OnboardingScreen';
import Row from '../../components/Row';
import Spacer from '../../components/Spacer';
import TextField from '../../components/TextField';
import Typography from '../../components/Typography';
import { UserContext } from '../../context/user/state';
import { useLoginMutation } from '../../generated/graphql';
import { NAVIGATORS } from '../../navigation/utils/enums/navigators';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { RootStackParamList } from '../../navigation/utils/screenConfigs/RootStack';
import TokenStore from '../../stores/TokenStore';
import { loginValidationSchema } from './utils';

const Container = styled(Column)`
  padding: 16px 24px 0 24px;
`;

const FullWidthButton = styled(Button)`
  width: 100%;
`;

type FormValues = {
  email: string;
  password: string;
};

const initialFormValues: FormValues = {
  email: '',
  password: '',
};

const LoginPage: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, SCREENS.LANDING>>();

  const theme = useTheme();

  const { setUser } = useContext(UserContext);

  const [login, { loading }] = useLoginMutation();

  const [isBannerOpen, setIsBannerOpen] = useState(false);

  const handleCloseBanner = () => {
    setIsBannerOpen(false);
  };

  const handleLogin = async ({ email, password }: FormValues) => {
    try {
      const { data, errors } = await login({
        variables: {
          data: { email, password },
        },
      });
      if (data && !errors) {
        const { user, accessToken, refreshToken } = data.userLogin;
        setUser(user);
        TokenStore.setTokens({ accessToken, refreshToken });
        navigation.push(NAVIGATORS.MAIN_STACK);
      } else {
        setIsBannerOpen(true);
      }
    } catch (error) {
      setIsBannerOpen(true);
    }
  };

  const goToSignUp = () => navigation.push(NAVIGATORS.SIGNUP_STACK);

  return (
    <>
      <Banner
        isOpen={isBannerOpen}
        close={handleCloseBanner}
        color={theme.colors.warning.primary}
        alert
      >
        Unable to login with those credentials
      </Banner>
      <OnboardingScreen>
        <Container justifyContent="center" alignItems="center">
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={initialFormValues}
            onSubmit={handleLogin}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <>
                <TextField
                  placeholder="Email Address"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoCapitalize="none"
                />
                {errors.email && (
                  <>
                    <Spacer height={4} />
                    <FormValidationError>{errors.email}</FormValidationError>
                  </>
                )}
                <Spacer height={16} />
                <TextField
                  placeholder="Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  textContentType="password"
                  secureTextEntry
                />
                {errors.password && (
                  <>
                    <Spacer height={4} />
                    <FormValidationError>{errors.password}</FormValidationError>
                  </>
                )}
                <Spacer height={16} />
                <FullWidthButton
                  onPress={
                    handleSubmit as unknown as (
                      e: NativeSyntheticEvent<NativeTouchEvent>,
                    ) => void
                  }
                  disabled={loading}
                  color={theme.colors.main.secondary}
                >
                  Login
                </FullWidthButton>
              </>
            )}
          </Formik>
          {loading && (
            <>
              <Spacer height={16} />
              <Column justifyContent="center" alignItems="center" fullWidth>
                <ActivityIndicator
                  color={theme.colors.main.secondary.toString()}
                />
              </Column>
            </>
          )}
          <Spacer height={16} />
          <Row justifyContent="space-between" alignItems="center" fullWidth>
            <Button>
              <Typography tag="p" color={theme.colors.main.secondary}>
                Forgot password?
              </Typography>
            </Button>
            <Button onPress={goToSignUp}>
              <Typography tag="p" color={theme.colors.main.secondary}>
                Sign up for an account
              </Typography>
            </Button>
          </Row>
        </Container>
      </OnboardingScreen>
    </>
  );
};

export default LoginPage;
