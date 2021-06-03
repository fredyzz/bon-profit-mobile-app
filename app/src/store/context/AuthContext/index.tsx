import React, {useReducer} from 'react';
import {createContext} from 'react';
import {AuthState} from './interfaces';
import {AuthContextProps} from './interfaces';
import {authReducer} from './reducer';
export const authInitialState: AuthState = {
  isLoggedIn: false,
  token: '',
  refreshToken: '',
  user: {
    name: '',
    lastname: '',
  },
};

//Create Context
export const AuthContext = createContext({} as AuthContextProps);

//State provider component
export const AuthProvider = ({children}: {children: JSX.Element}) => {
  const [authState, dispatch] = useReducer(authReducer, authInitialState);

  const signIn = (updatedState: any) => {
    dispatch({
      type: 'login',
      data: updatedState,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        signIn,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
