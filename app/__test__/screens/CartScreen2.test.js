import React from 'react';
import {CartScreen} from '../../src/screens/CartScreen';
import {render, fireEvent} from '@testing-library/react-native';
import {saveOrder} from '../../src/services/cart';
import {groupDishesById} from '../../src/helpers/cart.helper';
import {useAuth} from '../../src/hooks/UseAuth';

jest.mock('../../src/helpers/cart.helper');
jest.mock('../../src/hooks/UseAuth');
jest.mock('@react-navigation/core');

const mockGoBack = jest.fn();

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');
jest.mock('@react-navigation/core', () => {
  const ActualNavigation = jest.requireActual('@react-navigation/core');
  return {
    ...ActualNavigation,
    useNavigation: () => ({
      setOptions: () => ({}),
      navigate: () => ({}),
      goBack: mockGoBack,
    }),
  };
});

jest.mock('react', () => {
  const ActualReact = jest.requireActual('react');
  return {
    ...ActualReact,
    useContext: () => ({
      addToCart: jest.fn,
      removeOneFromCart: jest.fn,
      removeAllFromCart: jest.fn,
      cartState: {
        cart: [],
      },
      authState: {
        token: 'token',
        isLoggedIn: true,
      },
    }),
  };
});

jest.mock('../../src/services/cart');

describe('Given a CartScreen', () => {
  describe('with an empty cart', () => {
    test('should call navigate function', () => {
      useAuth.mockReturnValue({
        isLoggedIn: true,
        token: 'token',
      });
      render(<CartScreen />);
      expect(mockGoBack).toHaveBeenCalled();
    });
  });
});
