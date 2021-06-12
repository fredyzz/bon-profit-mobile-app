import {Order} from '../context/OrdersContext/interfaces';
import {Dish, Restaurant} from '../context/RestaurantContext/interfaces';

export type authAction = {type: 'signIn'; data: {}} | {type: 'signOut'};

export type cartActions =
  | {type: 'addToCart'; dish: Dish}
  | {type: 'removeOneFromCart'; dishId: string}
  | {type: 'removeAllFromCart'};

export type restaurantAction = {
  type: 'loadRestaurant';
  restaurant: Restaurant;
};

export type ordersAction = {
  type: 'loadOrders';
  orders: Array<Order>;
};
