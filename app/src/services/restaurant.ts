import axios from 'axios';
import {Restaurant} from '../store/context/RestaurantContext/interfaces';
import {env} from '../../.env.js';

const RESTAURANTS_URL = env.ENDPOINTS.RESTAURANTS_URL;
export const getRestaurant = async (
  restaurantId: string,
  token: string,
): Promise<Restaurant> => {
  const config: any = {
    headers: {Authorization: `Bearer ${token}`},
  };

  const {data} = await axios.get(RESTAURANTS_URL, config);
  console.log(data);
  return data;
};
