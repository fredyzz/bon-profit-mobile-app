import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useContext} from 'react';
import {Button, StyleSheet, Text, View, FlatList} from 'react-native';
import {AuthContext} from '../store/context/AuthContext';
import {RestaurantContext} from '../store/context/RestaurantContext';
import {getRestaurantById} from '../services/restaurant';
import {DishCard} from './common/DishCard';
import {globalStyles} from '../theme/appTheme';
import {Dish} from '../store/context/RestaurantContext/interfaces';

interface Props extends StackScreenProps<any, any> {}

interface RouteParams {
  restaurantId: string;
  tableId: string;
}

export const RestaurantScreen = ({route, navigation}: Props) => {
  const {authState} = useContext(AuthContext);
  const {
    restaurantState: {restaurant},
    loadRestaurant,
  } = useContext(RestaurantContext);
  const {restaurantId, tableId} = route.params as RouteParams;

  useEffect(() => {
    async function getRestaurant(): Promise<void> {
      const restaurant = await getRestaurantById(restaurantId, authState.token);
      loadRestaurant(restaurant);
    }
    getRestaurant();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantId, authState.token]);

  const renderItem = ({item}: any) => <DishCard dish={item} />;

  return restaurant ? (
    <View style={[globalStyles.globalMargin, styles.container]}>
      <Text style={globalStyles.title}>
        {`restaurantId: ${restaurantId} tableId: ${tableId}`}
      </Text>

      <FlatList
        data={restaurant.dishes}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />

      {/* <View>
        <DishCard dish={restaurant.dishes[0]} />
        {restaurant.dishes.map(dish => (
          <DishCard dish={dish} key={dish._id} />
        ))}
      </View> */}

      {/* <Text>{JSON.stringify(restaurant)}</Text> */}
      <Button
        title="Go to page 2"
        onPress={() => navigation.navigate('Page2screen')}
      />
      <Button title="Go to page 1" onPress={() => navigation.popToTop()} />
    </View>
  ) : (
    <Text>No hay restaurant</Text>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  cardContainer: {
    width: '100%',
    height: 300,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
