import {Restaurant} from '../context/RestaurantContext/interfaces';

export type authAction = {type: 'signIn'; data: {}} | {type: 'signOut'};

export type restaurantAction = {
  type: 'loadRestaurant';
  restaurant: Restaurant;
};
