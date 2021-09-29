import AsyncStorage from '@react-native-async-storage/async-storage';

const REFRESH_TOKEN_KEY = 'dot-refresh-token';

type TokenPair = {
  accessToken: string;
  refreshToken: string;
};

class TokenStore {
  private _accessToken?: string;

  get accessToken() {
    return this._accessToken;
  }

  getRefreshToken = async () => {
    return await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
  };

  setAccessToken = (accessToken?: string) => {
    this._accessToken = accessToken;
  };

  setRefreshToken = async (refreshToken?: string) => {
    if (refreshToken) {
      await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    } else {
      await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  };

  setTokens = async (tokenPair?: TokenPair) => {
    this.setAccessToken(tokenPair?.accessToken);
    await this.setRefreshToken(tokenPair?.refreshToken);
  };
}

export default new TokenStore();
