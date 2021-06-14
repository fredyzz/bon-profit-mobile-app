import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {LoginScreen} from '../../src/screens/auth/LoginScreen';
import {validateLoginForm} from '../../src/helpers/login.validator';
import {Alert} from 'react-native';
import {login} from '../../src/services/auth/login';

jest.mock('../../src/helpers/login.validator');
jest.mock('../../src/services/auth/login');

const mockSignIn = jest.fn();

jest.mock('react', () => {
  const ActualReact = jest.requireActual('react');
  return {
    ...ActualReact,
    useContext: () => ({
      authState: {
        isLoggedIn: false,
        signIn: mockSignIn,
      },
    }),
  };
});

const navigation = {
  setOptions: jest.fn(),
  navigate: jest.fn(),
};

describe('Given a <LoginScreen/> component', () => {
  describe('when handleLogin function is called and login form has errors', () => {
    test('should fire an alert', () => {
      validateLoginForm.mockReturnValue(false);
      jest.spyOn(Alert, 'alert').mockReturnValueOnce('error');
      const {getByText} = render(<LoginScreen navigation={navigation} />);
      const loginBtn = getByText('Login');
      fireEvent.press(loginBtn);
      expect(Alert.alert).toHaveBeenCalled();
    });
  });
  describe('when handleLogin function is called and login form is valid', () => {
    test('should call login function', () => {
      validateLoginForm.mockReturnValue({isValid: true, message: ''});
      login.mockResolvedValue(() => jest.fn());
      const {getByText} = render(<LoginScreen navigation={navigation} />);
      const loginBtn = getByText('Login');
      fireEvent.press(loginBtn);
      expect(login).toHaveBeenCalled();
    });
  });
  describe('when handleLogin function is called, login form is valid and login is not success', () => {
    test('should fire an alert', () => {
      validateLoginForm.mockReturnValue({isValid: false});
      jest.spyOn(Alert, 'alert').mockReturnValueOnce('error');
      login.mockReturnValue({
        success: true,
      });
      const {getByText} = render(<LoginScreen navigation={navigation} />);
      const loginBtn = getByText('Login');
      fireEvent.press(loginBtn);
      expect(Alert.alert).toHaveBeenCalled();
    });
  });
  // describe('when handleLogin function is called, login form is valid and login is success', () => {
  //   test.only('should call singIn function', async () => {
  //     validateLoginForm.mockReturnValue({isValid: true});
  //     await login.mockImplementationOnce(() => ({
  //       success: true,
  //       loginResult: '',
  //     }));
  //     const {getByText} = render(<LoginScreen navigation={navigation} />);
  //     const loginBtn = getByText('Login');
  //     fireEvent.press(loginBtn);
  //     expect(mockSignIn).toHaveBeenCalled();
  //   });
  // });
});
