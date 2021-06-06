import {RestaurantState} from './interfaces';
import {restaurantAction} from '../../actions/actionTypes';
export function restaurantReducer(
  state: RestaurantState,
  action: restaurantAction,
): RestaurantState {
  switch (action.type) {
    case 'loadRestaurant':
      return {
        restaurant: action.restaurant,
      };

    default:
      return state;
  }
}
