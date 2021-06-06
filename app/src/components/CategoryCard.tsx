import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../theme/colors';

interface CardProps {
  category: string;
  callBack: (category: string) => void;
  isSelected: boolean | undefined;
}

export const CategoryCard = ({category, callBack, isSelected}: CardProps) => (
  <View style={[styles.categoryCard, isSelected && styles.selected]}>
    <TouchableOpacity
      onPress={() => callBack(category)}
      testID={`categoryCard-${category}`}>
      <Text style={isSelected && styles.selected}>{category}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  categoryCard: {
    width: 120,
    height: 120,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,

    elevation: 4,
    margin: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: Colors.primary,
    color: Colors.white,
  },
});
