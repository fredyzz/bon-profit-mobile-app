import axios from 'axios';
import {Restaurant} from '../store/context/RestaurantContext/interfaces';
import {env} from '../../.env.js';

const RESTAURANTS_URL = env.ENDPOINTS.RESTAURANTS_URL;

export const getRestaurantById = async (
  restaurantId: string,
  token: string,
): Promise<Restaurant> => {
  const QUERY_URL = RESTAURANTS_URL + restaurantId;
  const config: any = {
    headers: {Authorization: `Bearer ${token}`},
  };

  const {data} = await axios.get(QUERY_URL, config);

  return data;
};
