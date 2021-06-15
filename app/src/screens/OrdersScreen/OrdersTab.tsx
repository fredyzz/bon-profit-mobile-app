/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useContext, useState} from 'react';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {CartContext} from '../../store/context/CartContext';
import {OrdersContext} from '../../store/context/OrdersContext';
import {useAuth} from '../../hooks/UseAuth';
import {Order} from '../../store/context/OrdersContext/interfaces';
import {fiterOrdersByDeliveredState} from '../../helpers/order.helper';
import {getAllOrders} from '../../services/orders';
import {OrderCard} from '../../components/OrderCard';
import {globalStyles} from '../../theme/appTheme';
import {headerScreen} from '../../theme/headerScreen';

interface RouteParams {
  restaurantId: string;
  tableId: string;
}

interface StateProperties {
  activeOrders: Array<Order>;
}

export const OrdersTab = () => {
  const {token} = useAuth();
  const navigation: any = useNavigation();
  const {name: routeName} = useRoute();
  const {
    cartState: {cart},
  } = useContext(CartContext);
  const {ordersState, loadOrders} = useContext(OrdersContext);
  const [filteredOrders, setFilteredOrders] = useState<Array<Order>>([]);

  const updateFilteredOrders = (orders: Array<Order>): void => {
    setFilteredOrders(
      fiterOrdersByDeliveredState(
        orders,
        routeName === 'Active' ? false : true,
      ),
    );
  };

  const getOrders = async (callback: any) => {
    const orders = await getAllOrders(token);
    loadOrders(orders);
    callback();
  };

  useFocusEffect(
    React.useCallback(() => {
      getOrders(() => updateFilteredOrders(ordersState.orders));
    }, [ordersState.orders.length]),
  );

  useEffect(() => {
    getOrders(() => updateFilteredOrders(ordersState.orders));
  }, [ordersState.orders.length]);

  useEffect(() => {
    navigation.setOptions({
      navigationOptions: {
        gesturesEnabled: false,
      },
    });
  }, [navigation, cart]);

  const renderItem = ({item}: any) => <OrderCard order={item} />;

  return ordersState.orders ? (
    <View style={globalStyles.frameContainer}>
      <View style={globalStyles.frame}>
        <View style={headerScreen.container}>
          <Text style={globalStyles.title}>{`${routeName} orders`}</Text>
          {filteredOrders.length ? (
            <FlatList
              data={filteredOrders}
              renderItem={renderItem}
              keyExtractor={item => item._id}
            />
          ) : (
            <View style={[styles.noOrderIconContainer]}>
              <Icon name="sad-outline" style={styles.noOrderIcon} />
              <Text>{`No ${routeName.toLowerCase()} orders yet`}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  ) : (
    <Text>No products</Text>
  );
};

const styles = StyleSheet.create({
  noOrderIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noOrderIcon: {
    marginBottom: 20,
    fontSize: 50,
  },
});
