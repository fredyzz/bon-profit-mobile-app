import React, {useReducer} from 'react';
import {createContext} from 'react';
import {RestaurantState} from './interfaces';
import {RestaurantContextProps, Restaurant} from './interfaces';
import {restaurantReducer} from './reducer';
export const restaurantInitialState: RestaurantState = {
  restaurant: undefined,
};

export const RestaurantContext = createContext({} as RestaurantContextProps);

export const RestaurantProvider = ({children}: {children: JSX.Element}) => {
  const [restaurantState, dispatch] = useReducer(
    restaurantReducer,
    restaurantInitialState,
  );

  const loadRestaurant = (restaurant: Restaurant) => {
    dispatch({
      type: 'loadRestaurant',
      restaurant,
    });
  };

  return (
    <RestaurantContext.Provider
      value={{
        restaurantState,
        loadRestaurant,
      }}>
      {children}
    </RestaurantContext.Provider>
  );
};
