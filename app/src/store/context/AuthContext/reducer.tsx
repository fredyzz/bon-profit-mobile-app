import {AuthState} from './interfaces';
import {authAction} from '../../actions/actionTypes';
export function authReducer(state: AuthState, action: authAction): AuthState {
  switch (action.type) {
    case 'signIn':
      return {
        ...state,
        ...action.data,
        isLoggedIn: true,
      };
    case 'signOut':
      return {
        isLoggedIn: false,
        token: '',
        refreshToken: '',
        user: {
          name: '',
          lastname: '',
        },
      };
    default:
      return state;
  }
}
