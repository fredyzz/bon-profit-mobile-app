import {saveOrder} from '../../src/services/cart';
import axios from 'axios';

jest.mock('axios');

describe('Given a saveOrder function', () => {
  describe('forcing an reject response in axios', () => {
    test('should return an object with success prop as false', async () => {
      axios.post.mockImplementationOnce(() =>
        Promise.reject({data: {token: ''}}),
      );
      const result = await saveOrder();
      expect(result).toEqual({
        success: false,
        message: 'Order could not be saved ',
      });
    });
  });
  describe('getting a success response from axios', () => {
    test('should return an object with success prop as true', async () => {
      axios.post.mockImplementationOnce(() =>
        Promise.resolve({data: {token: ''}}),
      );
      const result = await saveOrder();
      expect(result).toEqual({
        success: true,
      });
    });
  });
});
