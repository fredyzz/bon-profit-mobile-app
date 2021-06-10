import {OrdersState} from './interfaces';
import {ordersAction} from '../../actions/actionTypes';
export function Ordersreducer(
  state: OrdersState,
  action: ordersAction,
): OrdersState {
  switch (action.type) {
    case 'loadOrders':
      return {
        orders: action.orders,
      };

    default:
      return state;
  }
}
