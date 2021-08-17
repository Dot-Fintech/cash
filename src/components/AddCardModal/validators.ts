import { isBefore } from 'date-fns';
import { Card_Provider } from 'generated/graphql';
import { detectCardProvider } from 'utils/card';

export const validateCardholderName = (value: unknown): string | undefined => {
  const stringValue = String(value);
  if (stringValue.length < 3) {
    return 'Name too short';
  }
};

export const validatePrimaryAccountNumber = (
  value: unknown,
): string | undefined => {
  const stringValue = String(value);
  if (!parseInt(stringValue)) {
    return 'Value must be a number';
  }
  if (stringValue.length < 14) {
    return 'Number needs to be at least 14 digits long';
  }
  const cardProvider = detectCardProvider(stringValue);
  if (
    cardProvider !== Card_Provider.Visa &&
    cardProvider !== Card_Provider.Mastercard
  ) {
    return 'Card number must refer to a valid VISA or Mastercard card';
  }
};

export const validateExpiryDate = (value: unknown): string | undefined => {
  const stringValue = String(value);
  if (!parseInt(stringValue)) {
    return 'Expiry date should be in the form MMYY';
  }
  if (stringValue.length < 4) {
    return 'Expiry date should be 4 digits';
  }
  const today = new Date();
  const expiryMonth = parseInt(stringValue.slice(0, 2));
  if (expiryMonth < 0 || expiryMonth > 12) {
    return 'Invalid month';
  }
  const expiryYear = parseInt(stringValue.slice(2, 4)) + 2000;
  if (expiryYear > today.getFullYear() + 10) {
    return 'Invalid year';
  }
  const expiryDate = new Date(expiryYear, expiryMonth - 1);
  if (isBefore(expiryDate, today)) {
    return 'This card has expired';
  }
};

export const validateServiceCode = (value: unknown): string | undefined => {
  const stringValue = String(value);
  if (!parseInt(stringValue)) {
    return 'CVV should be a number';
  }
  if (stringValue.length < 3) {
    return 'CVV is a 3 or 4 digit code on the back of the card';
  }
};
