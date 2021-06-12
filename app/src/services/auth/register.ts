import {RegisterFormData} from './../../interfaces/registerFormData';
import axios from 'axios';
import {env} from '../../../.env';

interface registerValidationResponse {
  success: boolean;
  message?: string;
}

export async function register(
  registerFormData: RegisterFormData,
): Promise<registerValidationResponse> {
  const SIGN_UP_URL = env.ENDPOINTS.SIGN_UP_URL;

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
