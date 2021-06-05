import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useContext} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../store/context/AuthContext';
import {RestaurantContext} from '../store/context/RestaurantContext';
import {getRestaurantById} from '../services/restaurant';
import {globalStyles} from '../theme/appTheme';

interface Props extends StackScreenProps<any, any> {}

interface RouteParams {
  restaurantId: string;
  tableId: string;
}

export const RestaurantScreen = ({route, navigation}: Props) => {
  const {authState} = useContext(AuthContext);
  const {restaurantState, loadRestaurant} = useContext(RestaurantContext);
  const {restaurantId, tableId} = route.params as RouteParams;

  useEffect(() => {
    async function getRestaurant(): Promise<void> {
      const restaurant = await getRestaurantById(restaurantId, authState.token);
      loadRestaurant(restaurant);
    }
    getRestaurant();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantId, authState.token]);

  return (
    <View style={[globalStyles.globalMargin, styles.container]}>
      <Text style={globalStyles.title}>
        {`restaurantId: ${restaurantId} tableId: ${tableId}`}
      </Text>
      <Text>{JSON.stringify(restaurantState.restaurant)}</Text>
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
