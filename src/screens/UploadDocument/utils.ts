import { Kyc_Document_Type } from '../../generated/graphql';

export const getPageDetails = (
  document: Kyc_Document_Type,
): { title: string; description: string } => {
  switch (document) {
    case Kyc_Document_Type.Identification:
      return {
        title: 'ID',
        description:
          "Upload a picture of your valid national ID, driver's license or passport.",
      };
    case Kyc_Document_Type.ProofOfAddress:
      return {
        title: 'Proof of address',
        description:
          'Upload a picture of a bank statement or utility bill no older than 3 months.',
      };
  }
};
