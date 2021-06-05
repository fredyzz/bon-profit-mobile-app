import {Dish} from '../store/context/RestaurantContext/interfaces';

export const getDishCategories = (dishList: Array<Dish>): Array<string> => {
  const reducer = (categoriesList: Array<string>, dish: Dish): any => {
    if (!categoriesList.includes(dish.category)) {
      categoriesList.push(dish.category);
    }
    return categoriesList;
  };
  return dishList.reduce(reducer, []);
};

export const filterDishByCategory = (
  dishList: Array<Dish>,
  category: string | undefined,
): Array<Dish> => {
  if (!category) {
    return dishList;
  }
  return dishList.filter(dish => dish.category !== category);
};
