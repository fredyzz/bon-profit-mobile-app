import {Dish} from '../store/context/RestaurantContext/interfaces';
import {DishGroup} from '../store/context/RestaurantContext/interfaces';

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
  category: string,
): Array<Dish> => {
  if (!category) {
    return dishList;
  }
  return dishList.filter(dish => dish.category === category);
};

export const groupDishesById = (dishList: Array<Dish>): Array<DishGroup> => {
  const reducer = (
    dishGroups: Array<DishGroup>,
    dish: Dish,
  ): Array<DishGroup> => {
    if (!dishGroups.find(dishGroup => dishGroup.id === dish._id)) {
      dishGroups.push({
        id: dish._id,
        quantity: 1,
        dish,
      });
    } else {
      var groupIndex = dishGroups.findIndex(
        dishGroup => dishGroup.id === dish._id,
      );
      dishGroups[groupIndex] = {
        ...dishGroups[groupIndex],
        quantity: dishGroups[groupIndex].quantity + 1,
      };
    }
    return dishGroups;
  };

  return dishList.reduce(reducer, []);
};
