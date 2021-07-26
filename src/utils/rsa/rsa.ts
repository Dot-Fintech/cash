import axios from 'axios';

const PUBLIC_KEY_CONTAINER_NAME = 'rsapublickeys';

export const getPublicKey = async (): Promise<string> => {
  const res = await axios.get(
    `https://dotstagingstorageaccount.blob.core.windows.net/${PUBLIC_KEY_CONTAINER_NAME}/key`,
  );
  return String(res.data);
};

export const encrypt = (message: string, publicKey: string): string => {
  const jsEncrypt = new JSEncrypt();
  jsEncrypt.setPublicKey(publicKey);
  return jsEncrypt.encrypt(message);
};
