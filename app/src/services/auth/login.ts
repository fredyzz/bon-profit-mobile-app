import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {env} from '../../../.env.js';
interface loginFormResponse {
  success: boolean;
  message: string;
  token?: string;
  refreshToken?: string;
  user?: {
    name: string;
    lastname: string;
    avatar?: string;
  };
}

export const clearStorage = async (): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(env.CONSTANTS.STORAGE_KEY);
    return true;
  } catch (e) {
    return e;
  }
};

export async function login(
  email?: String,
  password?: String,
  storageToken?: string,
): Promise<loginFormResponse> {
  const LOGIN_URL = env.ENDPOINTS.LOGIN_URL;
  const USER_URL = env.ENDPOINTS.USER_URL;
  let TOKEN = storageToken;
  let REFRESH_TOKEN = '';

  try {
    if (!storageToken) {
      const {data}: any = await axios.post(LOGIN_URL, {
        email,
        password,
      });

      TOKEN = data.token;
      REFRESH_TOKEN = data.refreshToken;
    }

    if (TOKEN) {
      const config: any = {
        headers: {Authorization: `Bearer ${TOKEN}`},
      };

      const {
        data: {user},
      } = await axios.get(USER_URL, config);

      return {
        success: true,
        message: 'Logged succesfully',
        token: TOKEN,
        refreshToken: REFRESH_TOKEN,
        user: {
          name: user.name,
          lastname: user.lastname,
          avatar: user.avatarUrl ? user.avatarUrl : '',
        },
      };
    }

    return {
      success: false,
      message: 'Wrong credentials',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Wrong credentials',
    };
  }
}
