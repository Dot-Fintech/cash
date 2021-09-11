import {
  FullUserFragment,
  Kyc_Document_Status,
  Kyc_Document_Type,
} from '../../generated/graphql';
import { isDefined } from '../../utils/typeGuards';

const KYC_TYPES = {
  identification: Kyc_Document_Type.Identification,
  proofOfAddress: Kyc_Document_Type.ProofOfAddress,
};

export const getMissingDocuments = (
  kyc: FullUserFragment['kyc'],
): Kyc_Document_Type[] =>
  Object.keys(kyc)
    .map((key) => {
      if (key === '__typename') return;
      const type = key as keyof Omit<FullUserFragment['kyc'], '__typename'>;
      if (
        kyc[type].status === Kyc_Document_Status.Unverified &&
        !kyc[type].notes
      ) {
        return KYC_TYPES[type];
      }
    })
    .filter(isDefined);
