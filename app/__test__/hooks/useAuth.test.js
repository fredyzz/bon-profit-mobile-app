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
        isLoggedIn: false,
        token: 'token',
        user: {},
      },
      singOut: jest.fn,
    }),
  };
});

describe('Given an useAuth hook', () => {
  describe('if user is not logged', () => {
    test('should call navigate function', () => {
      renderHook(() => useAuth());
      expect(mockNavigate).toHaveBeenCalled();
    });
  });
});
