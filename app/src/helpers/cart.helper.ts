import {Dish} from '../store/context/RestaurantContext/interfaces';
import {DishGroup} from '../store/context/RestaurantContext/interfaces';

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

export const calculateTotalAmount = (dishList: Array<Dish>): number => {
  const reducer = (totalAmount: number, dish: Dish) => {
    totalAmount = totalAmount + +dish.price;
    return totalAmount;
  };

  return dishList.reduce(reducer, 0);
};
