const { getAll } = require('./restaurant.controller')();
const Restaurant = require('../models/restaurant.model');

jest.mock('../models/restaurant.model');

describe('Given a restaurantController', () => {
  describe('invoking a getAll function', () => {
    test('should call res.json with an object as argument', async () => {
      Restaurant.find.mockImplementationOnce(() => ({
        populate: jest.fn().mockImplementationOnce(() => ({})),
      }));

      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };

      const req = {
      };

      await getAll(req, res);
      expect(res.json).toHaveBeenCalled();
    });
  });
  describe('invoking a getAll function without req arguments', () => {
    test('should return a status 404', async () => {
      Restaurant.find.mockRejectedValueOnce(404);

      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };

      const req = {
      };

      await getAll(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});
