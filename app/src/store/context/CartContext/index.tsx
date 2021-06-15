import React, {useReducer, createContext} from 'react';
import {CartState, CartContextProps} from './interfaces';
import {Dish} from '../RestaurantContext/interfaces';
import {cartReducer} from './reducer';
export const CartInitialState: CartState = {
  cart: [],
};

export const CartContext = createContext({} as CartContextProps);

export const CartProvider = ({children}: {children: JSX.Element}) => {
  const [cartState, dispatch] = useReducer(cartReducer, CartInitialState);

  const addToCart = (dish: Dish) => {
    dispatch({
      type: 'addToCart',
      dish,
    });
  };

  const removeOneFromCart = (dishId: string) => {
    dispatch({
      type: 'removeOneFromCart',
      dishId,
    });
  };

  const removeAllFromCart = () => {
    dispatch({
      type: 'removeAllFromCart',
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartState,
        addToCart,
        removeOneFromCart,
        removeAllFromCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};
