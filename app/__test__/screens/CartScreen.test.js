import React from 'react';
import {CartScreen} from '../../src/screens/CartScreen';
import {render, fireEvent} from '@testing-library/react-native';
import {saveOrder} from '../../src/services/cart';
import {groupDishesById} from '../../src/helpers/cart.helper';
import {useAuth} from '../../src/hooks/UseAuth';

jest.mock('../../src/helpers/cart.helper');
jest.mock('../../src/hooks/UseAuth');
jest.mock('@react-navigation/core');

const dishList = [
  {
    _id: 1,
    title: 'dish 1',
    price: 20,
  },
  {
    _id: 1,
    title: 'dish 1',
    price: 20,
  },
];

const dishGroups = [
  {
    id: '1',
    quantity: 1,
    dish: {
      _id: 1,
      title: 'dish 1',
      price: 20,
    },
  },
];

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');
jest.mock('@react-navigation/core', () => {
  const ActualNavigation = jest.requireActual('@react-navigation/core');
  return {
    ...ActualNavigation,
    useNavigation: () => ({
      setOptions: () => ({}),
      navigate: jest.fn(),
      goBack: () => ({}),
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
        cart: dishList,
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
  describe('if it renders normally', () => {
    test('should show a title "Confirm your order', () => {
      useAuth.mockReturnValue({
        isLoggedIn: true,
        token: 'token',
      });
      const {getAllByText} = render(<CartScreen />);
      const title = getAllByText('Confirm your order');
      expect(title.length).toBe(1);
    });
  });
  describe('if confirm button is pressed', () => {
    test('should show a title "Confirm your order', async () => {
      groupDishesById.mockReturnValue(dishGroups);
      saveOrder.mockResolvedValue({success: true});
      useAuth.mockReturnValue({
        isLoggedIn: true,
        token: 'token',
      });
      const {getByTestId} = render(<CartScreen />);
      const btnConfirm = getByTestId('btnConfirm-Cart');
      fireEvent.press(btnConfirm);
      expect(saveOrder).toHaveBeenCalled();
    });
  });
});
