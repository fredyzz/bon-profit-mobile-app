import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Colors} from '../theme/colors';
import {Order} from '../store/context/OrdersContext/interfaces';
import {Dish} from '../store/context/RestaurantContext/interfaces';
import {getLongestTime} from '../helpers/order.helper';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  order: Order;
}
export const OrderCard = ({order}: Props) => {
  const orderDate = new Date(order.date);
  const formatedDate = `${orderDate.getDay()}/${orderDate.getMonth()}/${orderDate.getFullYear()}`;
  const formatedTime = `${orderDate.getHours()}:${orderDate.getMinutes()}`;
  return (
    <View style={styles.container}>
      <View style={styles.dishesImagesContainer}>
        {order.dishes.slice(0, 4).map((dish: Dish, index: number) => (
          <Image
            source={{uri: dish.imagesHref[0]}}
            style={styles.dishImage}
            key={index}
          />
        ))}
        {order.dishes.length > 5 && (
          <View style={[styles.dishImage, styles.dishPlaceholder]}>
            <Icon
              name="ellipsis-horizontal"
              style={styles.dishPlaceholderIcon}
            />
          </View>
        )}
      </View>
      <View style={styles.dishData}>
        <Text style={styles.title}>
          Ordered: {formatedDate} - {formatedTime}
        </Text>
        {!order.isDelivered && (
          <Text style={styles.title}>
            Waiting estimated time: {getLongestTime(order.dishes)}
          </Text>
        )}

        <Text style={styles.stateText}>
          {order.isDelivered ? 'Delivered' : 'Waiting for delivery'}
        </Text>
      </View>
      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 300,
    minHeight: 200,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,

    elevation: 4,
    borderRadius: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingRight: 20,
  },
  dishData: {
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Colors.primary,
    fontSize: 18,
    letterSpacing: 1,
  },
  stateText: {
    marginTop: 14,
    color: Colors.dark,
    fontSize: 18,
    letterSpacing: 1,
  },
  dishesImagesContainer: {
    flexDirection: 'row',
    height: 50,
  },
  dishImage: {
    width: 60,
    height: 60,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    marginRight: -10,
  },
  dishPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dishPlaceholderIcon: {
    fontSize: 26,
  },
});
