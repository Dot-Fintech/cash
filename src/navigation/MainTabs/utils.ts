import { IconName } from '../../utils/types/Ionicons';
import { NAVIGATORS } from '../utils/enums/navigators';
import { SCREENS } from '../utils/enums/screens';

export const getTabBarIconName = (
  route: string,
): IconName | 'money' | undefined => {
  switch (route) {
    case NAVIGATORS.HOME_STACK:
      return 'home';
    case NAVIGATORS.EXPLORE_TABS:
      return 'compass';
    case NAVIGATORS.MONEY_STACK:
      return 'money';
    case SCREENS.METRICS:
      return 'trending-up';
    case NAVIGATORS.PROFILE_STACK:
      return 'person';
  }
};
