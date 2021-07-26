declare global {
  class JSEncrypt {
    setPublicKey(key: string): void;
    encrypt(message: string): string;
  }
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      REACT_APP_SERVER_URL: string;
      REACT_APP_GOOGLE_MAPS_API_KEY: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
