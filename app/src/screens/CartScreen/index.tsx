import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useContext} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {groupDishesById, calculateTotalAmount} from '../../helpers/cart.helper';
import {CartItemCard} from '../../components/CartItemCard';
import {globalStyles} from '../../theme/appTheme';
import {headerScreen} from '../../theme/headerScreen';
import {CartContext} from '../../store/context/CartContext';
import {saveOrder} from '../../services/cart';
import {useAuth} from '../../hooks/UseAuth';

interface RouteParams {
  restaurantId: string;
  tableId: string;
}

export const CartScreen = () => {
  const {token: userToken} = useAuth();
  const navigation: any = useNavigation();
  const {
    cartState: {cart},
    addToCart,
    removeOneFromCart,
    removeAllFromCart,
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

  const sendOrder = async (cartToSave: any, token: string = userToken) => {
    const response = await saveOrder(token, cartToSave);
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
        <View style={headerScreen.container}>
          <Text style={globalStyles.title}>Confirm your order</Text>
          <FlatList
            data={groupDishesById(cart)}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
          <View style={headerScreen.totalContainer}>
            <Text style={headerScreen.totalText}>total:</Text>
            <Text style={headerScreen.totalText}>
              € {calculateTotalAmount(cart)}
            </Text>
          </View>
          <View style={headerScreen.btnContainer}>
            <TouchableOpacity
              style={[globalStyles.bigButton, headerScreen.btnLogin]}
              testID="btnConfirm-Cart"
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
