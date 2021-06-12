import {useNavigation} from '@react-navigation/core';
import {useContext, useEffect} from 'react';
import {AuthContext} from '../store/context/AuthContext/index';

export const useAuth = () => {
  const {authState, signOut} = useContext(AuthContext);
  const navigation = useNavigation();
  useEffect(() => {
    if (!authState.isLoggedIn) {
      navigation.navigate('LoginScreen');
    }
  }, [authState, navigation]);

  return {
    token: authState.token,
    user: authState.user,
    signOut,
  };
};
