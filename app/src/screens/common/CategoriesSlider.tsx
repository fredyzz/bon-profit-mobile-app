import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../../theme/colors';

interface SliderProps {
  categories: Array<string>;
  callBack: (category: string) => void;
  selectedCategory: string | undefined;
}

interface CardProps {
  category: string;
  callBack: (category: string) => void;
  isSelected: boolean | undefined;
}

const CategoryCard = ({category, callBack, isSelected}: CardProps) => (
  <View style={[styles.categoryCard, isSelected && styles.selected]}>
    <TouchableOpacity onPress={() => callBack(category)}>
      <Text style={isSelected && styles.selected}>{category}</Text>
    </TouchableOpacity>
  </View>
);

export const CategoriesSlider = ({
  categories,
  callBack,
  selectedCategory,
}: SliderProps) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} horizontal={true}>
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            category={category}
            callBack={callBack}
            isSelected={category === selectedCategory ? true : false}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 140,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {},
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
    // shadowColor: Colors.primary,
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowOpacity: 0.8,
    // shadowRadius: 5.84,

    // elevation: 4,
    backgroundColor: Colors.primary,
    color: Colors.white,
  },
});
