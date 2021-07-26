import { Card_Provider } from '../generated/graphql';

const regex = {
  electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
  maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
  dankort: /^(5019)\d+$/,
  interpayment: /^(636)\d+$/,
  unionpay: /^(62|88)\d+$/,
  visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
  mastercard: /^5[1-5][0-9]{14}$/,
  amex: /^3[47][0-9]{13}$/,
  diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
  discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
  jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
};

export const detectCardProvider = (
  primaryAccountNumber: string,
): Card_Provider | undefined => {
  let key: keyof typeof regex;
  for (key in regex) {
    if (regex[key].test(primaryAccountNumber)) {
      switch (key) {
        case 'visa':
          return Card_Provider.Visa;
        case 'mastercard':
          return Card_Provider.Mastercard;
        case 'amex':
          return Card_Provider.AmericanExpress;
        case 'discover':
          return Card_Provider.Discover;
        default:
          return;
      }
    }
  }
};
