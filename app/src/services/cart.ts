import axios from 'axios';
import {Dish} from '../store/context/RestaurantContext/interfaces';
import {env} from '../../.env.js';

interface saveOrderResponse {
  success: boolean;
  message?: string;
}
export const saveOrder = async (
  token: string,
  cart: Array<Dish>,
): Promise<saveOrderResponse> => {
  const config: any = {
    headers: {Authorization: `Bearer ${token}`},
  };
  try {
    const {data} = await axios.post(
      env.ENDPOINTS.ORDERS_URL,
      {dishes: cart},
      config,
    );
    console.log('newOrder', data);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Order could not be saved ',
    };
  }
};
