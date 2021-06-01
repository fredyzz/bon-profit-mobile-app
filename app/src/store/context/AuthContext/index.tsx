import React from 'react';
import {createContext} from 'react';

//Context interface
export interface AuthState {
  isLoggedIn: boolean;
  username?: string;
  favouriteIcon?: string;
}

//InitialState
export const authInitialState: AuthState = {
  isLoggedIn: false,
  username: undefined,
  favouriteIcon: undefined,
};

//Interface to know context form
export interface AuthContextProps {
  authState: AuthState;
  signIn: () => void;
}

//Create Context
export const AuthContext = createContext({} as AuthContextProps);

//State provider component
export const AuthProvider = ({children}: {children: JSX.Element}) => {
  return (
    <AuthContext.Provider
      value={{
        authState: authInitialState,
        signIn: () => {},
      }}>
      {children}
    </AuthContext.Provider>
  );
};
