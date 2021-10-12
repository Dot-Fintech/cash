import { Card_Provider } from '../../generated/graphql';

export const formatCardProvider = (provider: Card_Provider): string => {
  switch (provider) {
    case Card_Provider.Visa:
      return 'Visa';
    case Card_Provider.Mastercard:
      return 'MasterCard';
    case Card_Provider.Discover:
      return 'Discover';
    case Card_Provider.AmericanExpress:
      return 'American Express';
  }
};
