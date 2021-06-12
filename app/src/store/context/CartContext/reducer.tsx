import {CartState} from './interfaces';
import {cartActions} from '../../actions/actionTypes';
export function cartReducer(
  state: CartState = {cart: []},
  action: cartActions,
): CartState {
  switch (action.type) {
    case 'addToCart':
      return {
        cart: [...state.cart, action.dish],
      };
    case 'removeOneFromCart':
      const dishIndex: number = state.cart.findIndex(
        dish => dish._id === action.dishId,
      );
      const updatedCart = [...state.cart];
      updatedCart.splice(dishIndex, 1);
      return {
        cart: updatedCart,
      };

    case 'removeAllFromCart':
      return {
        cart: [],
      };
    default:
      return state;
  }
}
