import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Dish} from '../../store/context/RestaurantContext/interfaces';
import {Colors} from '../../theme/colors';

interface Props {
  dish: Dish;
}
export const DishCard = ({dish}: Props) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: dish.imagesHref[0]}} style={styles.image} />
      <Text style={styles.cardTitle}>{dish.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 14,
    marginLeft: 5,
    backgroundColor: Colors.white,
    width: '96%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,

    elevation: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 100,
    marginLeft: 11,
    marginRight: 20,
  },
  cardTitle: {
    color: Colors.dark,
    fontSize: 22,
    marginTop: 16,
  },
});
