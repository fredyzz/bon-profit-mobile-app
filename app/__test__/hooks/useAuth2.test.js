import {useAuth} from '../../src/hooks/UseAuth';
import {renderHook} from '@testing-library/react-hooks';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/core', () => {
  const ActualNavigation = jest.requireActual('@react-navigation/core');
  return {
    ...ActualNavigation,
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

jest.mock('react', () => {
  const ActualReact = jest.requireActual('react');
  return {
    ...ActualReact,
    useContext: () => ({
      authState: {
        isLoggedIn: true,
        token: 'token',
        user: {},
      },
      singOut: jest.fn,
    }),
  };
});

describe('Given an useAuth hook', () => {
  describe('if user is logged', () => {
    test('should return an object with auth data', () => {
      const hookReturnValue = renderHook(() => useAuth());
      expect(JSON.stringify(hookReturnValue)).toEqual(
        '{"result":{"all":[{"token":"token","user":{}}],"current":{"token":"token","user":{}}}}',
      );
    });
  });
});
