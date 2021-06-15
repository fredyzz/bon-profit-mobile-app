/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useContext} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {headerScreen} from '../../theme/headerScreen';
import {Colors} from '../../theme/colors';
import {CartContext} from '../../store/context/CartContext';
import {getAllOrders} from '../../services/orders';
import {OrdersContext} from '../../store/context/OrdersContext';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {OrdersTab} from './OrdersTab';
import {useAuth} from '../../hooks/UseAuth';

interface RouteParams {
  restaurantId: string;
  tableId: string;
}

export const OrdersScreen = () => {
  const {token} = useAuth();
  const navigation: any = useNavigation();
  const {
    cartState: {cart},
  } = useContext(CartContext);
  const {ordersState, loadOrders} = useContext(OrdersContext);

  useFocusEffect(
    React.useCallback(() => {
      const getOrders = async () => {
        const orders = await getAllOrders(token);
        loadOrders(orders);
      };
      getOrders();
    }, []),
  );

  useEffect(() => {
    navigation.setOptions({
      navigationOptions: {
        gesturesEnabled: true,
      },
    });
  }, [navigation, cart]);

  const Tab = createBottomTabNavigator();

  return ordersState.orders ? (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            let iconName;

            if (route.name === 'Active') {
              iconName = 'hourglass-outline';
            } else if (route.name === 'Delivered') {
              iconName = 'checkbox-outline';
            }

            return (
              <Icon
                name={iconName ? iconName : 'ellipsis-horizontal'}
                size={size}
                color={color}
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: Colors.primary,
          inactiveTintColor: Colors.dark,
        }}>
        <Tab.Screen name="Active" component={OrdersTab} />
        <Tab.Screen name="Delivered" component={OrdersTab} />
        <Tab.Screen
          name="Button"
          component={OrdersTab}
          options={{
            tabBarButton: () => (
              <TouchableOpacity
                style={headerScreen.btnTabContainer}
                onPress={() => navigation.navigate('StackNavigator')}>
                <View style={headerScreen.btnTab}>
                  <Text style={headerScreen.btnTabText}>New Order</Text>
                </View>
              </TouchableOpacity>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  ) : (
    <Text>No products</Text>
  );
};
