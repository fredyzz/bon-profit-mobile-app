import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useContext, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../store/context/AuthContext';
import {RestaurantContext} from '../store/context/RestaurantContext';
import {getRestaurant} from '../services/restaurant';
import {globalStyles} from '../theme/appTheme';

interface Props extends StackScreenProps<any, any> {}

interface RouteParams {
  restaurantId: string;
  tableId: string;
}

export const RestaurantScreen = ({route, navigation}: Props) => {
  const {authState} = useContext(AuthContext);
  const {restaurantState} = useContext(RestaurantContext);
  const {restaurantId, tableId} = route.params as RouteParams;
  const [restaurant] = useState();

  useEffect(() => {
    async function getRestaurantsData(): Promise<void> {
      const data = await getRestaurant(restaurantId, authState.token);
      console.log(data);
    }
    getRestaurantsData();
  }, [restaurantId, authState.token]);

  console.log('restaurants ------->', restaurantState.restaurants);

  return (
    <View style={[globalStyles.globalMargin, styles.container]}>
      <Text style={globalStyles.title}>
        {`restaurantId: ${restaurantId} tableId: ${tableId}`}
      </Text>
      <Text>{JSON.stringify(restaurant)}</Text>
      <Button
        title="Go to page 2"
        onPress={() => navigation.navigate('Page2screen')}
      />
      <Button title="Go to page 1" onPress={() => navigation.popToTop()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});
