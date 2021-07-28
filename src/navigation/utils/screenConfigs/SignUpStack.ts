import Biometrics from '../../../screens/Biometrics';
import { SetProfilePhoto } from '../../../screens/ProfilePhoto';
import Safety from '../../../screens/Safety';
import SignUp from '../../../screens/SignUp';
import { SCREENS } from '../enums/screens';
import { StackScreenConfig } from '../types/ScreenConfig';

const SignUpConfig: StackScreenConfig = {
  component: SignUp,
  options: { headerShown: false },
};

const ProfilePhotoConfig: StackScreenConfig = {
  component: SetProfilePhoto,
  options: { headerShown: false },
};

const SafetyConfig: StackScreenConfig = {
  component: Safety,
  options: { headerShown: false },
};

const BiometricsPhotoConfig: StackScreenConfig = {
  component: Biometrics,
  options: { headerShown: false },
};

export const SignUpStackScreenConfigs = {
  [SCREENS.SIGN_UP]: SignUpConfig,
  [SCREENS.SET_PROFILE_PHOTO]: ProfilePhotoConfig,
  [SCREENS.SAFETY]: SafetyConfig,
  [SCREENS.BIOMETRICS]: BiometricsPhotoConfig,
};

export const SignUpStackScreenNames = Object.keys(
  SignUpStackScreenConfigs,
) as (keyof typeof SignUpStackScreenConfigs)[];

export type SignUpStackParamList = {
  [SCREENS.SIGN_UP]: undefined;
  [SCREENS.SET_PROFILE_PHOTO]: undefined;
  [SCREENS.SAFETY]: undefined;
  [SCREENS.BIOMETRICS]: undefined;
};
