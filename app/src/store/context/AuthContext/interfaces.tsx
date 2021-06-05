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

export interface AuthContextProps {
  authState: AuthState;
  signIn: (updatedState: any) => void;
  signOut: (updatedState: any) => void;
}
