import {Dish} from '../RestaurantContext/interfaces';

export interface CartState {
  cart: Array<Dish>;
}

export interface CartContextProps {
  cartState: CartState;
  addToCart: (dish: Dish) => void;
  removeOneFromCart: (dishId: string) => void;
  removeAllFromCart: () => void;
}
