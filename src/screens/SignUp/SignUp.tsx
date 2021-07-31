import { Formik } from 'formik';
import React, { useContext, useState } from 'react';
import {
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeTouchEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled, { useTheme } from 'styled-components';

import Banner from '../../components/Banner';
import Button from '../../components/Button';
import Column from '../../components/Column';
import FormValidationError from '../../components/FormValidationError';
import Logo from '../../components/Logo';
import Screen from '../../components/Screen';
import Spacer from '../../components/Spacer';
import TextField from '../../components/TextField';
import Typography from '../../components/Typography';
import { UserContext } from '../../context/user/state';
import { useSignUpMutation } from '../../generated/graphql';
import TokenStore from '../../stores/TokenStore';
import { useSignUpValidationSchema } from './utils';

const Container = styled(Column)`
  padding: 80px 24px 0 24px;
`;

const FullWidthButton = styled(Button)`
  width: 100%;
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
  const theme = useTheme();
  const { top } = useSafeAreaInsets();

  const { setUser } = useContext(UserContext);

  const {
    loadingIsTaken,
    isEmailTaken,
    isUsernameTaken,
    signUpValidationSchema,
  } = useSignUpValidationSchema();

  const [signUp, { loading }] = useSignUpMutation();

  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
        setSubmitted(true);
      } else {
        setIsBannerOpen(true);
      }
    } catch (error) {
      setIsBannerOpen(true);
    }
  };

  return (
    <>
      <Banner
        isOpen={isBannerOpen}
        color={theme.colors.warning.primary}
        close={handleCloseBanner}
        paddingTop={top}
        alert
      >
        Hmm. Something went wrong while trying to sign up
      </Banner>
      <Screen unsafe>
        <Container justifyContent="center" alignItems="center">
          <Logo size={64} />
          <Spacer height={24} />
          {!submitted ? (
            <>
              <Formik
                validationSchema={signUpValidationSchema}
                initialValues={initialFormValues}
                onSubmit={handleSignUp}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                }) => (
                  <>
                    <TextField
                      placeholder="First Name"
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      value={values.firstName}
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
                    />
                    {errors.lastName && (
                      <>
                        <Spacer height={4} />
                        <FormValidationError>
                          {errors.lastName}
                        </FormValidationError>
                      </>
                    )}
                    <Spacer height={16} />
                    <TextField
                      placeholder="Username"
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                      value={values.username}
                      autoCapitalize="none"
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
                      secureTextEntry
                    />
                    {errors.password && (
                      <>
                        <Spacer height={4} />
                        <FormValidationError>
                          {errors.password}
                        </FormValidationError>
                      </>
                    )}
                    <Spacer height={16} />
                    <FullWidthButton
                      onPress={
                        handleSubmit as unknown as (
                          e: NativeSyntheticEvent<NativeTouchEvent>,
                        ) => void
                      }
                      disabled={disableSubmit}
                      color={theme.colors.main.secondary}
                    >
                      Sign Up
                    </FullWidthButton>
                  </>
                )}
              </Formik>
              {loading && (
                <>
                  <Spacer height={16} />
                  <Column justifyContent="center" alignItems="center" fullWidth>
                    <ActivityIndicator
                      color={theme.colors.main.primary.toString()}
                    />
                  </Column>
                </>
              )}
            </>
          ) : (
            <>
              <Typography tag="h2" textAlign="center">
                Nice!
              </Typography>
              <Spacer height={16} />
              <Typography tag="p" textAlign="center">
                We sent you an email to verify your email address. To continue
                the sign up process, follow the directions outlined in the
                email.
              </Typography>
              <Spacer height={16} />
              <Typography tag="p" textAlign="center">
                It should take at most 10 minutes for you to receive the email
                (check your spam / junk folder as well) but if you don't receive
                the email by then, please contact support so that we can guide
                you through the rest of the sign up process.
              </Typography>
            </>
          )}
          <Spacer height={16} />
        </Container>
      </Screen>
    </>
  );
};

export default SignUpPage;
