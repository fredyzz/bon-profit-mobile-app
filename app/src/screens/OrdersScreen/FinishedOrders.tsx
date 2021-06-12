/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useContext, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {OrderCard} from '../../components/OrderCard';
import {globalStyles} from '../../theme/appTheme';
import {Colors} from '../../theme/colors';
import {CartContext} from '../../store/context/CartContext';
import {AuthContext} from '../../store/context/AuthContext';
import {getAllOrders} from '../../services/orders';
import {OrdersContext} from '../../store/context/OrdersContext';
import {useFocusEffect} from '@react-navigation/native';
import {Order} from '../../store/context/OrdersContext/interfaces';
import {fiterOrdersByDeliveredState} from '../../helpers/order.helper';
import Icon from 'react-native-vector-icons/Ionicons';

interface RouteParams {
  restaurantId: string;
  tableId: string;
}

interface StateProperties {
  activeOrders: Array<Order>;
}

export const FinishedOrders = () => {
  const navigation: any = useNavigation();
  const {
    cartState: {cart},
  } = useContext(CartContext);
  const {authState} = useContext(AuthContext);
  const {ordersState, loadOrders} = useContext(OrdersContext);
  const [deliveredOrders, setDeliveredOrders] = useState<Array<Order>>([]);

  const updateActiveOrders = (orders: Array<Order>): void => {
    const filteredOrders = fiterOrdersByDeliveredState(orders, true);
    setDeliveredOrders(filteredOrders);
  };

  const getOrders = async (callback: any) => {
    const orders = await getAllOrders(authState.token);
    loadOrders(orders);
    callback();
  };
  useEffect(() => {
    if (!authState.isLoggedIn) {
      navigation.navigate('LoginScren');
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getOrders(() => updateActiveOrders(ordersState.orders));
    }, [ordersState.orders.length]),
  );

  useEffect(() => {
    getOrders(() => updateActiveOrders(ordersState.orders));
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
        <View style={styles.container}>
          <Text style={globalStyles.title}>Delivered orders</Text>
          {deliveredOrders.length ? (
            <FlatList
              data={deliveredOrders}
              renderItem={renderItem}
              keyExtractor={item => item._id}
            />
          ) : (
            <View style={[styles.noOrderIconContainer]}>
              <Icon name="sad-outline" style={styles.noOrderIcon} />
              <Text>No delivered orders yet</Text>
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
  headerTitle: {
    alignItems: 'center',
    marginTop: 120,
  },
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: 100,
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  title: {
    color: Colors.resalt,
    marginTop: -0,
    fontSize: 32,
  },
  btnCartTextContainer: {
    borderRadius: 100,
    width: 24,
    height: 24,
    backgroundColor: Colors.dark,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
    marginBottom: -4,
    marginLeft: 15,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 50,
  },
  btnLogin: {backgroundColor: Colors.primary},
  btnCartText: {
    color: Colors.primary,
    fontSize: 12,
  },
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
