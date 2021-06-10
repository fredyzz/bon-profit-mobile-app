import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../theme/colors';
import {Order} from '../store/context/OrdersContext/interfaces';

interface Props {
  order: Order;
}
export const OrderCard = ({order}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.dishData}>
        <Text style={styles.title}>{`${JSON.stringify(order.dishes)}`}</Text>
      </View>
      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 14,
    marginLeft: 5,
    backgroundColor: Colors.white,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingRight: 20,
  },
  dishData: {
    marginLeft: 20,
    height: '100%',
    width: 160,
    justifyContent: 'center',
  },
  title: {
    color: Colors.dark,
    fontSize: 18,
  },
  category: {
    color: Colors.resalt,
    fontSize: 14,
    marginTop: 2,
  },
  price: {
    color: Colors.dark,
    fontSize: 14,
    marginTop: 2,
  },
  actionButton: {
    width: 50,
    height: 50,
    marginRight: 0,

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 4,
  },
  actionButtonLeft: {
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
  actionButtonRight: {
    marginLeft: 10,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
  },
  actionButtonText: {color: Colors.white},
});
