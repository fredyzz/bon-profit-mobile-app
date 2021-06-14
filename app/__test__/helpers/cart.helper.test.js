import {
  groupDishesById,
  calculateTotalAmount,
} from '../../src/helpers/cart.helper';

const dishList = [
  {
    _id: 1,
    title: 'dish 1',
    price: 20,
  },
  {
    _id: 1,
    title: 'dish 1',
    price: 20,
  },
];

describe('Given a groupDishesById function', () => {
  describe('receiving an array with two items with same id', () => {
    test('should return one dishGroup with that id', () => {
      const result = groupDishesById(dishList);
      expect(result).toEqual([
        {id: 1, quantity: 2, dish: {_id: 1, title: 'dish 1', price: 20}},
      ]);
    });
  });
});

describe('Given a calculateTotalAmount function', () => {
  describe('receiving an array with two with price 20', () => {
    test('should return 40', () => {
      const result = calculateTotalAmount(dishList);
      expect(result).toBe(40);
    });
  });
});
