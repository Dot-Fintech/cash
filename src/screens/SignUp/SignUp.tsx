import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import React, { useContext, useState } from 'react';
import {
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeTouchEvent,
  TouchableOpacity,
} from 'react-native';
import styled, { useTheme } from 'styled-components';

import Banner from '../../components/Banner';
import Button from '../../components/Button';
import Column from '../../components/Column';
import FormValidationError from '../../components/FormValidationError';
import OnboardingScreen from '../../components/OnboardingScreen';
import Spacer from '../../components/Spacer';
import TextField from '../../components/TextField';
import Typography from '../../components/Typography';
import { UserContext } from '../../context/user/state';
import { useSignUpMutation } from '../../generated/graphql';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { SignUpStackParamList } from '../../navigation/utils/paramLists/SignUpStack';
import TokenStore from '../../stores/TokenStore';
import { useSignUpValidationSchema } from './utils';

const Container = styled(Column)`
  padding: 32px 24px 0 24px;
`;

const LogInPromptContainer = styled(TouchableOpacity)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
};

const initialFormValues: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
};

const SignUpPage: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<SignUpStackParamList, SCREENS.SIGN_UP>>();

  const theme = useTheme();

  const { setUser } = useContext(UserContext);

  const {
    loadingIsTaken,
    isEmailTaken,
    isUsernameTaken,
    signUpValidationSchema,
  } = useSignUpValidationSchema();

  const [signUp, { loading }] = useSignUpMutation();

  const [isBannerOpen, setIsBannerOpen] = useState(false);

  const disableSubmit = loading || loadingIsTaken;

  const handleCloseBanner = () => {
    setIsBannerOpen(false);
  };

  const handleSignUp = async ({
    firstName,
    lastName,
    email,
    username,
    password,
  }: FormValues) => {
    try {
      const { data, errors } = await signUp({
        variables: {
          data: {
            firstName,
            lastName,
            email,
            username,
            password,
          },
        },
      });
      if (data && !errors) {
        const { user, accessToken, refreshToken } = data.userSignUp;
        setUser(user);
        TokenStore.setTokens({ accessToken, refreshToken });
        navigation.push(SCREENS.VERIFY_EMAIL);
      } else {
        setIsBannerOpen(true);
      }
    } catch (error) {
      setIsBannerOpen(true);
    }
  };

  const goBack = () => navigation.pop();

  return (
    <>
      <Banner
        isOpen={isBannerOpen}
        color={theme.colors.warning.primary}
        close={handleCloseBanner}
        alert
      >
        Hmm. Something went wrong while trying to sign up
      </Banner>
      <OnboardingScreen>
        <Container justifyContent="center" alignItems="center">
          <Formik
            validationSchema={signUpValidationSchema}
            initialValues={initialFormValues}
            onSubmit={handleSignUp}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <>
                <TextField
                  placeholder="First Name"
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                  autoCompleteType="name"
                />
                {errors.firstName && (
                  <>
                    <Spacer height={4} />
                    <FormValidationError>
                      {errors.firstName}
                    </FormValidationError>
                  </>
                )}
                <Spacer height={16} />
                <TextField
                  placeholder="Last Name"
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                  autoCompleteType="name"
                />
                {errors.lastName && (
                  <>
                    <Spacer height={4} />
                    <FormValidationError>{errors.lastName}</FormValidationError>
                  </>
                )}
                <Spacer height={16} />
                <TextField
                  placeholder="Username"
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoCompleteType="username"
                />
                {(isUsernameTaken || errors.username) && (
                  <>
                    <Spacer height={4} />
                    <FormValidationError>
                      {isUsernameTaken
                        ? 'Username is already taken'
                        : errors.username}
                    </FormValidationError>
                  </>
                )}
                <Spacer height={16} />
                <TextField
                  placeholder="Email Address"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoCompleteType="email"
                />
                {(isEmailTaken || errors.email) && (
                  <>
                    <Spacer height={4} />
                    <FormValidationError>
                      {isEmailTaken
                        ? 'Email Address is already taken'
                        : errors.email}
                    </FormValidationError>
                  </>
                )}
                <Spacer height={16} />
                <TextField
                  placeholder="Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  textContentType="password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoCompleteType="password"
                  secureTextEntry
                />
                {errors.password && (
                  <>
                    <Spacer height={4} />
                    <FormValidationError>{errors.password}</FormValidationError>
                  </>
                )}
                <Spacer height={16} />
                <Button
                  onPress={
                    handleSubmit as unknown as (
                      e: NativeSyntheticEvent<NativeTouchEvent>,
                    ) => void
                  }
                  disabled={disableSubmit}
                  fullWidth
                >
                  Sign Up
                </Button>
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
          <LogInPromptContainer onPress={goBack}>
            <Typography tag="p" color={theme.colors.main.secondary}>
              Already have an account?
            </Typography>
            <Typography tag="p" color={theme.colors.main.secondary}>
              Tap here to log in
            </Typography>
          </LogInPromptContainer>
        </Container>
      </OnboardingScreen>
    </>
  );
};

export default SignUpPage;
