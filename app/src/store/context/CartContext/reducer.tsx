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

    default:
      return state;
  }
}
