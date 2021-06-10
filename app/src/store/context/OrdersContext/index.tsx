import React, {useReducer} from 'react';
import {createContext} from 'react';
import {OrdersContextProps, Order, OrdersState} from './interfaces';
import {Ordersreducer} from './reducer';
export const ordersInitialState: OrdersState = {
  orders: [],
};

export const OrdersContext = createContext({} as OrdersContextProps);

export const OrdersProvider = ({children}: {children: JSX.Element}) => {
  const [ordersState, dispatch] = useReducer(Ordersreducer, ordersInitialState);

  const loadOrders = (orders: Array<Order>) => {
    dispatch({
      type: 'loadOrders',
      orders,
    });
  };

  return (
    <OrdersContext.Provider
      value={{
        ordersState,
        loadOrders,
      }}>
      {children}
    </OrdersContext.Provider>
  );
};
