import {Dish} from '../RestaurantContext/interfaces';

export interface Order {
  _id: string;
  userId: string;
  date: Date;
  dishes: Array<Dish>;
  isDelivered: boolean;
  isPaid: boolean;
  imageUrl: string;
}

export interface OrdersState {
  orders: Array<Order>;
}

export interface OrdersContextProps {
  ordersState: OrdersState;
  loadOrders: (orders: Array<Order>) => void;
}
