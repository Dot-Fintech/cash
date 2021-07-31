import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .max(50, ({ max }) => `Email Address can be at most ${max} characters`)
    .required('Email Address is required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .max(30, ({ max }) => `Password can be at most ${max} characters`)
    .required('Password is required'),
});
