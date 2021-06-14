import {login} from '../../../src/services/auth/login';
import axios from 'axios';

jest.mock('axios');

describe('Given a login function forcing an reject response in axios', () => {
  test('should return an object with success prop as false', async () => {
    axios.post.mockImplementationOnce(() =>
      Promise.reject({data: {token: ''}}),
    );
    const result = await login();
    expect(result).toEqual({
      success: false,
      message: 'Wrong credentials',
    });
  });
  describe('calling it without arguments', () => {
    test('should return an object with success prop as true', async () => {
      axios.post.mockImplementationOnce(() =>
        Promise.resolve({data: {token: 'token'}}),
      );
      axios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: {user: {name: '', lastname: '', avatarUrl: 'avatar'}},
        }),
      );
      const result = await login('email', 'password');
      expect(result.success).toBe(true);
    });
  });
  describe('forcing a reject response from axios.get method', () => {
    test('should return an object with success prop as false', async () => {
      axios.post.mockImplementationOnce(() => Promise.resolve({data: {}}));
      const result = await login('email', 'password');
      expect(result.success).toBe(false);
    });
  });
});
