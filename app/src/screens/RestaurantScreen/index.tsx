/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {RestaurantContext} from '../../store/context/RestaurantContext';
import {getRestaurantById} from '../../services/restaurant';
import {CartContext} from '../../store/context/CartContext';
import {useAuth} from '../../hooks/UseAuth';
import Icon from 'react-native-vector-icons/Ionicons';
import {CategoriesSlider} from '../../components/CategoriesSlider';
import {DishCard} from '../../components/DishCard';
import {globalStyles} from '../../theme/appTheme';
import {Colors} from '../../theme/colors';
import {
  getDishCategories,
  filterDishByCategory,
} from '../../helpers/restaurant.helper';

interface RouteParams {
  restaurantId: string;
  tableId: string;
}

export const RestaurantScreen = ({route}: any) => {
  const navigation: any = useNavigation();
  const {token} = useAuth();
  const {
    cartState: {cart},
    addToCart,
  } = useContext(CartContext);
  const {
    restaurantState: {restaurant},
    loadRestaurant,
  } = useContext(RestaurantContext);
  const {restaurantId} = route.params as RouteParams;
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filtererdDishes, setFilteredDishes] = useState([]);

  useEffect(() => {
    async function getRestaurant(): Promise<void> {
      const restaurantFromApi = await getRestaurantById(restaurantId, token);
      loadRestaurant(restaurantFromApi);
    }
    getRestaurant();
  }, [restaurantId, token]);

  useEffect(() => {
    navigation.setOptions({
      navigationOptions: {
        gesturesEnabled: false,
      },
      headerLeft: () => (
        <TouchableOpacity
          style={globalStyles.btnMenu}
          onPress={() => navigation.navigate('ScanScreen')}>
          <Icon name="chevron-back-outline" style={globalStyles.icon} />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <View style={styles.headerTitle}>
          <Image
            style={styles.logo}
            source={
              restaurant?.avatarUrl
                ? {uri: restaurant?.avatarUrl}
                : require('../../images/avatar-placeholder.png')
            }
          />
          <Text style={[globalStyles.title, styles.title]}>
            {restaurant?.name}
          </Text>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={[
            globalStyles.btnMenu,
            globalStyles.btnMenuRight,
            !cart.length && globalStyles.buttonDisabled,
          ]}
          disabled={!cart.length}
          onPress={() => navigation.navigate('CartScreen')}>
          <View style={styles.btnCartTextContainer}>
            <Text style={styles.btnCartText}>{cart.length}</Text>
          </View>

          <Icon name="cart-outline" style={globalStyles.icon} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, restaurant, cart]);

  useEffect(() => {
    if (restaurant?.dishes) {
      const filterResult: any = filterDishByCategory(
        restaurant?.dishes,
        selectedCategory,
      );
      setFilteredDishes(filterResult);
    }
  }, [selectedCategory, restaurant]);

  const renderItem = ({item}: any) => (
    <DishCard dish={item} action={() => addToCart(item)} />
  );

  const toogleSelectedCategoty = (category: string): void => {
    if (selectedCategory === category) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(category);
    }
  };

  return restaurant ? (
    <View style={globalStyles.frameContainer}>
      <View style={globalStyles.frame}>
        <View style={styles.container}>
          <CategoriesSlider
            categories={getDishCategories(restaurant.dishes)}
            callBack={category => toogleSelectedCategoty(category)}
            selectedCategory={selectedCategory}
          />
          <FlatList
            data={filtererdDishes ? filtererdDishes : restaurant.dishes}
            renderItem={renderItem}
            keyExtractor={item => item._id}
          />
        </View>
      </View>
    </View>
  ) : (
    <Text>Restaurant not found</Text>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    alignItems: 'center',
    marginTop: 120,
  },
  container: {
    flex: 1,
    paddingTop: 100,
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

  btnCartText: {
    color: Colors.primary,
    fontSize: 12,
  },
});
