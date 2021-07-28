import Documents from '../../../screens/Documents';
import Profile from '../../../screens/Profile';
import { ChangeProfilePhoto } from '../../../screens/ProfilePhoto';
import { SCREENS } from '../enums/screens';
import { StackScreenConfig } from '../types/ScreenConfig';

const ProfileConfig: StackScreenConfig = {
  component: Profile,
  options: { headerShown: false },
};

const ProfilePhotoConfig: StackScreenConfig = {
  component: ChangeProfilePhoto,
  options: { headerShown: false },
};

const DocumentsConfig: StackScreenConfig = {
  component: Documents,
  options: { headerShown: false },
};

export const ProfileStackScreenConfigs = {
  [SCREENS.PROFILE]: ProfileConfig,
  [SCREENS.CHANGE_PROFILE_PHOTO]: ProfilePhotoConfig,
  [SCREENS.DOCUMENTS]: DocumentsConfig,
};

export const ProfileStackScreenNames = Object.keys(
  ProfileStackScreenConfigs,
) as (keyof typeof ProfileStackScreenConfigs)[];

export type ProfileStackParamList = {
  [SCREENS.PROFILE]: undefined;
  [SCREENS.CHANGE_PROFILE_PHOTO]: undefined;
  [SCREENS.DOCUMENTS]: undefined;
};
