import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {AuthContext} from '../store/context/AuthContext';
import {RestaurantContext} from '../store/context/RestaurantContext';
import {getRestaurantById} from '../services/restaurant';
import Icon from 'react-native-vector-icons/Ionicons';
import {DishCard} from './common/DishCard';
import {globalStyles} from '../theme/appTheme';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface RouteParams {
  restaurantId: string;
  tableId: string;
}

export const RestaurantScreen = ({route}: any) => {
  const navigation: any = useNavigation();
  const {authState} = useContext(AuthContext);
  const {
    restaurantState: {restaurant},
    loadRestaurant,
  } = useContext(RestaurantContext);
  const {restaurantId} = route.params as RouteParams;

  useEffect(() => {
    async function getRestaurant(): Promise<void> {
      const restaurant = await getRestaurantById(restaurantId, authState.token);
      loadRestaurant(restaurant);
    }
    getRestaurant();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantId, authState.token]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={globalStyles.btnMenu}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" style={globalStyles.icon} />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <View style={styles.headerTitle}>
          <Image style={styles.logo} source={{uri: restaurant?.avatarUrl}} />
          <Text style={[globalStyles.title, styles.title]}>
            {restaurant?.name}
          </Text>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={[globalStyles.btnMenu, globalStyles.btnMenuRight]}
          onPress={() => navigation.toggleDrawer()}>
          <Icon name="cart-outline" style={globalStyles.icon} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, restaurant]);

  const renderItem = ({item}: any) => (
    <DishCard dish={item} action={() => console.log(item._id)} />
  );

  return restaurant ? (
    <View style={globalStyles.frameContainer}>
      <View style={globalStyles.frame}>
        <View style={styles.container}>
          <FlatList
            data={restaurant.dishes}
            renderItem={renderItem}
            keyExtractor={item => item._id}
          />
        </View>
      </View>
    </View>
  ) : (
    <Text>No hay restaurant</Text>
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
});
