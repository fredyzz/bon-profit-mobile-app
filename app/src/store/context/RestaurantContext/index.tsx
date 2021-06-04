import React, {useReducer} from 'react';
import {createContext} from 'react';
import {RestaurantState} from './interfaces';
import {RestaurantContextProps} from './interfaces';
import {restaurantReducer} from './reducer';
export const restaurantInitialState: RestaurantState = {
  restaurants: [],
};

export const RestaurantContext = createContext({} as RestaurantContextProps);

export const RestaurantProvider = ({children}: {children: JSX.Element}) => {
  const [restaurantState] = useReducer(
    restaurantReducer,
    restaurantInitialState,
  );

  // const signIn = () => {};

  return (
    <RestaurantContext.Provider
      value={{
        restaurantState,
      }}>
      {children}
    </RestaurantContext.Provider>
  );
};
