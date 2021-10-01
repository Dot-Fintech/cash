import {
  Kyc_Document_Status,
  Kyc_Document_Type,
} from '../../generated/graphql';

export const getTitle = (type: Kyc_Document_Type): string | undefined =>
  type === Kyc_Document_Type.Identification
    ? 'ID'
    : type === Kyc_Document_Type.ProofOfAddress
    ? 'Proof of Address'
    : undefined;

export const formatStatus = (status: Kyc_Document_Status): string => {
  switch (status) {
    case Kyc_Document_Status.Unverified:
      return 'Not verified';
    case Kyc_Document_Status.InReview:
      return 'In review';
    case Kyc_Document_Status.Verified:
      return 'Verified';
  }
};
