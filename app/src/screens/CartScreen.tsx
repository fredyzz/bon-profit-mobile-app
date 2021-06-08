import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useContext} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
// import {AuthContext} from '../store/context/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {groupDishesById, calculateTotalAmount} from '../helpers/cart.helper';
import {CartItemCard} from '../components/CartItemCard';
import {globalStyles} from '../theme/appTheme';
import {Colors} from '../theme/colors';
import {CartContext} from '../store/context/CartContext';

interface RouteParams {
  restaurantId: string;
  tableId: string;
}

export const CartScreen = () => {
  const navigation: any = useNavigation();
  //   const {authState} = useContext(AuthContext);
  const {
    cartState: {cart},
    addToCart,
  } = useContext(CartContext);

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

  const renderItem = ({item}: any) => (
    <CartItemCard dishGroup={item} action={() => addToCart(item.dish)} />
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
          <View>
            <Text>total: {calculateTotalAmount(cart)}</Text>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={[globalStyles.bigButton, styles.btnLogin]}>
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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnLogin: {backgroundColor: Colors.primary},
  btnCartText: {
    color: Colors.primary,
    fontSize: 12,
  },
});
