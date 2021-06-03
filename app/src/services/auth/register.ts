import {RegisterFormData} from './../../interfaces/registerFormData';
import axios from 'axios';

interface registerValidationResponse {
  success: boolean;
  message?: string;
}

export async function register(
  registerFormData: RegisterFormData,
): Promise<registerValidationResponse> {
  const SIGN_UP_URL = 'http://localhost:4000/api/auth/signup';

  try {
    await axios.post(SIGN_UP_URL, registerFormData);

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Email is already taken',
    };
  }
}
