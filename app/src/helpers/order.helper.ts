import {Order} from '../store/context/OrdersContext/interfaces';
import {Dish} from '../store/context/RestaurantContext/interfaces';

export const getLongestTime = (dishList: Array<Dish>): number => {
  const sortedByTime = dishList.sort((a: Dish, b: Dish) => {
    return b.cookTime - a.cookTime;
  });

  return sortedByTime[0].cookTime;
};

export const fiterOrdersByDeliveredState = (
  orders: Array<Order>,
  isDelivered: boolean,
): Array<Order> => {
  return orders.filter(order => order.isDelivered === isDelivered);
};
