import {AuthState} from './interfaces';
import {authAction} from '../../actions/actionTypes';
export function authReducer(state: AuthState, action: authAction): AuthState {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        ...action.data,
        isLoggedIn: true,
      };

    default:
      return state;
  }
}
