/**
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {DrawerNavigator} from './src/navigator/DrawerNavigator';
import {AuthProvider} from './src/store/context/AuthContext';
import {RestaurantProvider} from './src/store/context/RestaurantContext';
import {CartProvider} from './src/store/context/CartContext';
import {OrdersProvider} from './src/store/context/OrdersContext';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <RestaurantProvider>
          <CartProvider>
            <OrdersProvider>
              <DrawerNavigator />
            </OrdersProvider>
          </CartProvider>
        </RestaurantProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
