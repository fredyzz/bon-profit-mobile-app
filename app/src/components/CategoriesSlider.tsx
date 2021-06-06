import * as React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {CategoryCard} from './CategoryCard';

interface SliderProps {
  categories: Array<string>;
  callBack: (category: string) => void;
  selectedCategory: string | undefined;
}

export const CategoriesSlider = ({
  categories,
  callBack,
  selectedCategory,
}: SliderProps) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
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
});
