import axios from 'axios';
import { useState } from 'react';

import TokenStore from '../stores/TokenStore';

type Result = [
  (file: File, containerName: string) => Promise<string | undefined>,
  { loading: boolean },
];

export const useUploadImage = (size: number): Result => {
  const { accessToken } = TokenStore;

  const [loading, setLoading] = useState(false);

  const upload = async (file: File, containerName: string) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', file);
      const res = await axios.post(
        `${process.env.SERVER_URL}/api/image-upload/${containerName}?size=${size}`,
        formData,
        {
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : '',
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      setLoading(false);
      return res.data as string;
    } catch (error) {
      setLoading(false);
      void error;
    }
  };

  return [upload, { loading }];
};
