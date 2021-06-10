import {Dish, Order, Restaurant} from '../context/RestaurantContext/interfaces';

export type authAction = {type: 'signIn'; data: {}} | {type: 'signOut'};

export type cartActions =
  | {type: 'addToCart'; dish: Dish}
  | {type: 'removeOneFromCart'; dishId: string};

export type restaurantAction = {
  type: 'loadRestaurant';
  restaurant: Restaurant;
};

export type ordersAction = {
  type: 'loadOrders';
  orders: Array<Order>;
};
