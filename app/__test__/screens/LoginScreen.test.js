import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';
import {LoginScreen} from '../../src/screens/auth/LoginScreen';
import AsyncStorageMock from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('../../src/services/auth/login');

jest.mock('react', () => {
  const ActualReact = jest.requireActual('react');
  return {
    ...ActualReact,
    useContext: () => ({authState: {isLoggedIn: true}}),
  };
});

const navigation = {
  setOptions: jest.fn(),
  navigate: jest.fn(),
};

describe('Given a <LoginScreen/> component', () => {
  describe('when user is logged', () => {
    test('should call navigation', () => {
      render(<LoginScreen navigation={navigation} />);
      expect(navigation.navigate).toHaveBeenCalled();
    });
  });
});
