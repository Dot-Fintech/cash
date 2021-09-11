import { Kyc_Document_Type } from '../../../generated/graphql';
import { SCREENS } from '../enums/screens';

export type ProfileStackParamList = {
  [SCREENS.PROFILE]: undefined;
  [SCREENS.CHANGE_PROFILE_PHOTO]: undefined;
  [SCREENS.DOCUMENTS]: undefined;
  [SCREENS.UPLOAD_DOCUMENT]: { documents: Kyc_Document_Type[] };
};
