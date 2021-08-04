import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { NAVIGATORS } from './navigation/utils/enums/navigators';
import { SCREENS } from './navigation/utils/enums/screens';

export const linking: LinkingOptions = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      [NAVIGATORS.SIGNUP_STACK]: {
        screens: {
          [SCREENS.EMAIL_VERIFIED]: 'email-verified',
        },
      },
    },
  },
};
