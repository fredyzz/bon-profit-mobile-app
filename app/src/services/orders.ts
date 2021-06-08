import axios from 'axios';
import {env} from '../../.env.js';
import {Dish} from '../store/context/RestaurantContext/interfaces.js';

interface Order {
  userId: string;
  date: string;
  dishes: Array<Dish>;
  isDelivered: boolean;
  isPaid: boolean;
}

export const getAllOrders = async (token: string): Promise<Array<Order>> => {
  const config: any = {
    headers: {Authorization: `Bearer ${token}`},
  };

  const {data} = await axios.get(env.ENDPOINTS.ORDERS_URL, config);

  return data;
};
