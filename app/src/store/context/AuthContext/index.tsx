import React, {useState} from 'react';
import {createContext} from 'react';

//Context interface
export interface AuthState {
  isLoggedIn: boolean;
  token: string,
  refreshtoken: string,
  name: string,
  lastname: string,
  avatarUrl?: string,
}

//InitialState
export const authInitialState: AuthState = {
  isLoggedIn: false,
  token: '',
  refreshtoken: '',
  user: {
    name: '',
    lastname: ''
  }
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
//AuthContext states
const [authState, setAuthState] = useState(authInitialState)
function signIn (updatedState : AuthState) : void{
  setAuthState({...updatedState, isLoggedIn: true})
}
  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState,
        signIn,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
