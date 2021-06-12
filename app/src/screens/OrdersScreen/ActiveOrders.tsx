/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useContext} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {OrderCard} from '../../components/OrderCard';
import {globalStyles} from '../../theme/appTheme';
import {Colors} from '../../theme/colors';
import {CartContext} from '../../store/context/CartContext';
import {AuthContext} from '../../store/context/AuthContext';
import {getAllOrders} from '../../services/orders';
import {OrdersContext} from '../../store/context/OrdersContext';
import {useFocusEffect} from '@react-navigation/native';

interface RouteParams {
  restaurantId: string;
  tableId: string;
}

export const ActiveOrders = () => {
  const navigation: any = useNavigation();
  const {
    cartState: {cart},
  } = useContext(CartContext);
  const {authState} = useContext(AuthContext);
  const {ordersState, loadOrders} = useContext(OrdersContext);

  useEffect(() => {
    if (!authState.isLoggedIn) {
      navigation.navigate('LoginScren');
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const getOrders = async () => {
        const orders = await getAllOrders(authState.token);
        loadOrders(orders);
      };
      getOrders();
    }, []),
  );

  useEffect(() => {
    navigation.setOptions({
      navigationOptions: {
        gesturesEnabled: false,
      },
      headerLeft: () => (
        <TouchableOpacity
          style={globalStyles.btnMenu}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" style={globalStyles.icon} />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <View style={styles.headerTitle}>
          <Text style={[globalStyles.title, styles.title]}>Cart</Text>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={[globalStyles.btnMenu, globalStyles.btnMenuRight]}
          onPress={() => navigation.goBack()}>
          <Icon name="checkmark-outline" style={globalStyles.icon} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, cart]);

  const renderItem = ({item}: any) => <OrderCard order={item} />;

  return ordersState.orders ? (
    <View style={globalStyles.frameContainer}>
      <View style={globalStyles.frame}>
        <View style={styles.container}>
          <Text style={globalStyles.title}>Active orders</Text>
          <FlatList
            data={ordersState.orders}
            renderItem={renderItem}
            keyExtractor={item => item._id}
          />
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
});
