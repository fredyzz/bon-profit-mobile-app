import axios from 'axios';
import {env} from '../../.env.js';
import {Order} from '../store/context/OrdersContext/interfaces.js';
export const getAllOrders = async (token: string): Promise<Array<Order>> => {
  const config: any = {
    headers: {Authorization: `Bearer ${token}`},
  };

  const {data} = await axios.get(env.ENDPOINTS.ORDERS_URL, config);
  return data;
};
