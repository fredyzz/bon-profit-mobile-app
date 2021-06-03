import React, {useState} from 'react';
import {createContext} from 'react';

//Context interface
export interface AuthState {
  isLoggedIn?: boolean;
  token: string;
  refreshToken: string;
  user: {
    name: string;
    lastname: string;
  };
  avatarUrl?: string;
}

//InitialState
export const authInitialState: AuthState = {
  isLoggedIn: false,
  token: '',
  refreshToken: '',
  user: {
    name: '',
    lastname: '',
  },
};

//Interface to know context form
export interface AuthContextProps {
  authState: AuthState;
  signIn: (updatedState: any) => void;
}

//Create Context
export const AuthContext = createContext({} as AuthContextProps);

//State provider component
export const AuthProvider = ({children}: {children: JSX.Element}) => {
  //AuthContext states
  const [authState, setAuthState] = useState(authInitialState);
  function signIn(updatedState: any): void {
    setAuthState({...updatedState, isLoggedIn: true});
  }
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
