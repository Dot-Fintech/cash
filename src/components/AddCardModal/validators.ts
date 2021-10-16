import { isBefore } from 'date-fns';
import * as yup from 'yup';

import { Card_Provider } from '../../generated/graphql';
import { detectCardProvider } from './utils';

export const addCardValidationSchema = yup.object().shape({
  primaryAccountNumber: yup
    .string()
    .matches(/^[0-9]*$/, 'Card number must be a number')
    .min(14, ({ min }) => `Card number must be at least ${min} characters`)
    .max(19, ({ max }) => `Card number must be at most ${max} characters`)
    .test(
      'test-provider',
      'Card must be either VISA or Mastercard',
      (value) => {
        const cardProvider = value ? detectCardProvider(value) : undefined;
        return value
          ? cardProvider === Card_Provider.Visa ||
              cardProvider === Card_Provider.Mastercard
          : true;
      },
    )
    .required('Card number is required'),
  expiryDate: yup
    .string()
    .matches(/^[0-9]*$/, 'Expiration date must be in the form MMYY')
    .length(4, ({ length }) => `Expiration date should be ${length} digits`)
    .test('test-expiry', 'Invalid expiry date', (value) => {
      if (!value) return true;
      const today = new Date();
      const expiryMonth = parseInt(value.slice(0, 2));
      if (expiryMonth < 0 || expiryMonth > 12) {
        return false;
      }
      const expiryYear = parseInt(value.slice(2, 4)) + 2000;
      if (expiryYear > today.getFullYear() + 10) {
        return false;
      }
      const expiryDate = new Date(expiryYear, expiryMonth - 1);
      if (isBefore(expiryDate, today)) {
        return false;
      }
      return true;
    })
    .required('Expiration date is required'),
  serviceCode: yup
    .string()
    .matches(/^[0-9]*$/, 'CVV must be a number')
    .min(3, ({ min }) => `CVV must be at least ${min} digits`)
    .max(4, ({ max }) => `CVV must be at most ${max} digits`)
    .required('CVV is required'),
});
