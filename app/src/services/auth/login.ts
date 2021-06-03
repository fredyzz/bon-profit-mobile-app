import axios from 'axios';

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

export async function login(
  email: String,
  password: String,
): Promise<loginFormResponse> {
  const LOGIN_URL = 'http://localhost:4000/api/auth/login';
  const USER_URL = 'http://localhost:4000/api/user';

  try {
    const {
      data: {token, refreshToken},
    }: any = await axios.post(LOGIN_URL, {
      email,
      password,
    });

    if (token) {
      const config: any = {
        headers: {Authorization: `Bearer ${token}`},
      };

      const {
        data: {user},
      } = await axios.get(USER_URL, config);

      return {
        success: true,
        message: 'Logged succesfully',
        token,
        refreshToken,
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
