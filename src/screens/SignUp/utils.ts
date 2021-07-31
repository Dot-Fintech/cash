import debounce from 'debounce';
import * as yup from 'yup';

import {
  useIsEmailTakenLazyQuery,
  useIsUsernameTakenLazyQuery,
} from '../../generated/graphql';

type Result = {
  loadingIsTaken: boolean;
  isEmailTaken: boolean;
  isUsernameTaken: boolean;
  signUpValidationSchema: yup.ObjectSchema<any>;
};

export const useSignUpValidationSchema = (): Result => {
  const [isEmailTaken, emailTakenResult] = useIsEmailTakenLazyQuery();
  const [isUsernameTaken, usernameTakenResult] = useIsUsernameTakenLazyQuery();

  const signUpValidationSchema = yup.object().shape({
    firstName: yup
      .string()
      .matches(
        /^[a-zA-Z]*$/,
        'First name cannot contain any special characters',
      )
      .max(20, ({ max }) => `First name can be at most ${max} characters`)
      .required('First name is required'),
    lastName: yup
      .string()
      .matches(/^[a-zA-Z]*$/, 'Last name cannot contain any special characters')
      .max(20, ({ max }) => `Last name can be at most ${max} characters`)
      .required('Email Address is required'),
    username: yup
      .string()
      .matches(
        /^[a-z0-9]*$/,
        'Username should be lowercase and can contain numbers',
      )
      .min(3, ({ min }) => `Username must be at least ${min} characters`)
      .max(20, ({ max }) => `Username can be at most ${max} characters`)
      .test('is-taken', 'Username is already taken', (username) => {
        if (username && username.length > 2) {
          debounce(() => isUsernameTaken({ variables: { username } }), 1500)();
        }
        return true;
      })
      .required('Email Address is required'),
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is required')
      .max(50, ({ max }) => `Email Address can be at most ${max} characters`)
      .test('is-taken', 'Email Address is already taken', (email) => {
        if (email && email.length > 4) {
          debounce(() => isEmailTaken({ variables: { email } }), 1500)();
        }
        return true;
      }),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .max(30, ({ max }) => `Password can be at most ${max} characters`)
      .required('Password is required'),
  });

  return {
    loadingIsTaken: emailTakenResult.loading || usernameTakenResult.loading,
    isEmailTaken: emailTakenResult.data?.isEmailTaken ?? false,
    isUsernameTaken: usernameTakenResult.data?.isUsernameTaken ?? false,
    signUpValidationSchema,
  };
};
