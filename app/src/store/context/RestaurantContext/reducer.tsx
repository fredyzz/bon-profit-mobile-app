import {RestaurantState} from './interfaces';
import {restaurantAction} from '../../actions/actionTypes';
export function restaurantReducer(
  state: RestaurantState,
  action: restaurantAction,
): RestaurantState {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        ...action.data,
      };

    default:
      return state;
  }
}
