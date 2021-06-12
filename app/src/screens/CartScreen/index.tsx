import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useContext} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {groupDishesById, calculateTotalAmount} from '../../helpers/cart.helper';
import {CartItemCard} from '../../components/CartItemCard';
import {globalStyles} from '../../theme/appTheme';
import {Colors} from '../../theme/colors';
import {CartContext} from '../../store/context/CartContext';
import {AuthContext} from '../../store/context/AuthContext';
import {saveOrder} from '../../services/cart';

interface RouteParams {
  restaurantId: string;
  tableId: string;
}

export const CartScreen = () => {
  const navigation: any = useNavigation();
  const {
    cartState: {cart},
    addToCart,
    removeOneFromCart,
    removeAllFromCart,
  } = useContext(CartContext);
  const {
    authState: {token: userToken},
  } = useContext(AuthContext);

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

  useEffect(() => {
    if (!cart.length) {
      navigation.goBack();
    }
  }, [cart, navigation]);

  const sendOrder = async (cart: any, token: string = userToken) => {
    const response = await saveOrder(token, cart);
    if (response.success) {
      removeAllFromCart();
      navigation.navigate('OrdersScreen');
    }
  };

  const renderItem = ({item}: any) => (
    <CartItemCard
      dishGroup={item}
      add={() => addToCart(item.dish)}
      remove={() => removeOneFromCart(item.dish._id)}
    />
  );

  return cart ? (
    <View style={globalStyles.frameContainer}>
      <View style={globalStyles.frame}>
        <View style={styles.container}>
          <Text style={globalStyles.title}>Confirm your order</Text>
          <FlatList
            data={groupDishesById(cart)}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>total:</Text>
            <Text style={styles.totalText}>€ {calculateTotalAmount(cart)}</Text>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={[globalStyles.bigButton, styles.btnLogin]}
              onPress={() => sendOrder(cart)}>
              <Text style={globalStyles.bigButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
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
    paddingTop: 20,
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
  totalContainer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 26,
    color: Colors.dark,
  },
});
