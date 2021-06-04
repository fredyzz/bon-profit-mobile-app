/**
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {DrawerNavigator} from './src/navigator/DrawerNavigator';
import {AuthProvider} from './src/store/context/AuthContext';
import {RestaurantProvider} from './src/store/context/RestaurantContext';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <RestaurantProvider>
          <DrawerNavigator />
        </RestaurantProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
