import { FullUserFragment, Kyc_Document_Status } from '../../generated/graphql';

export const getTitle = (
  type: keyof Omit<FullUserFragment['kyc'], '__typename'>,
): string | undefined =>
  type === 'identification'
    ? 'ID'
    : type === 'proofOfAddress'
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
