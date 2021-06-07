import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {DishGroup} from '../store/context/RestaurantContext/interfaces';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalStyles} from '../theme/appTheme';
import {Colors} from '../theme/colors';

interface Props {
  dishGroup: DishGroup;
  action: () => void;
}
export const CartItemCard = ({dishGroup, action}: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={{uri: dishGroup.dish.imagesHref[0]}}
        style={styles.image}
      />
      <View style={styles.dishData}>
        <Text
          style={
            styles.title
          }>{`${dishGroup.quantity} x ${dishGroup.dish.title}`}</Text>
        <Text style={styles.category}>{dishGroup.dish.category}</Text>
        <Text style={styles.price}>€{dishGroup.dish.price}</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.actionButton} onPress={action}>
          <Icon
            name="add-outline"
            style={[globalStyles.icon, styles.actionButtonText]}
          />
        </TouchableOpacity>
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
  dishData: {
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
    marginRight: 30,
    borderRadius: 100,
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
  actionButtonText: {color: Colors.white},
});
