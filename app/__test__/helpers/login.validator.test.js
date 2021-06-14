import {validateLoginForm} from '../../src/helpers/login.validator';

describe('Given av alidateLoginForm function', () => {
  describe('called without email argument', () => {
    test('should return an object with message "Please fill in all the data"', () => {
      const result = validateLoginForm({email: undefined, password: undefined});
      expect(result).toEqual({
        isValid: false,
        message: 'Please fill in all the data',
      });
    });
  });
  describe('called without password argument', () => {
    test('should return an object with message "Please fill in all the data"', () => {
      const result = validateLoginForm({email: 'email', password: undefined});
      expect(result).toEqual({
        isValid: false,
        message: 'Please fill in all the data',
      });
    });
  });
  describe('called with an email in a wrong format', () => {
    test('should return an object with message "Please fill in all the data"', () => {
      const result = validateLoginForm({email: 'email', password: 'password'});
      expect(result).toEqual({
        isValid: false,
        message: 'Please write a valid email',
      });
    });
  });
  describe('called with correct data', () => {
    test('should return an object with isValid prop as true', () => {
      const result = validateLoginForm({
        email: 'email@email.com',
        password: 'password',
      });
      expect(result).toEqual({
        isValid: true,
        message: 'success',
      });
    });
  });
});
