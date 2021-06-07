import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ScanScreen} from '../screens/ScanScreen';
import {RestaurantScreen} from '../screens/RestaurantScreen';
import {CartScreen} from '../screens/CartScreen';
import {Colors} from '../theme/colors';

export type RootStackParams = {
  ScanScreen: undefined;
  RestaurantScreen: {restaurantId: string; tableId: string};
  CartScreen: {restaurantId: string; tableId: string};
  PersonScreen: {id: number; name: string};
  Page3screen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
        },
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen
        name="ScanScreen"
        options={{
          title: '',
          headerStyle: {
            backgroundColor: Colors.primary,
            shadowRadius: 0,
            shadowOffset: {
              width: 0,
              height: 0,
            },
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        component={ScanScreen}
      />
      <Stack.Screen
        name="RestaurantScreen"
        options={{
          gestureEnabled: false,
          title: '',
          headerStyle: {
            backgroundColor: Colors.primary,
            shadowRadius: 0,
            shadowOffset: {
              width: 0,
              height: 0,
            },
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        component={RestaurantScreen}
      />
      <Stack.Screen
        name="CartScreen"
        options={{
          gestureEnabled: true,
          title: '',
          headerStyle: {
            backgroundColor: Colors.primary,
            shadowRadius: 0,
            shadowOffset: {
              width: 0,
              height: 0,
            },
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        component={CartScreen}
      />
    </Stack.Navigator>
  );
};
