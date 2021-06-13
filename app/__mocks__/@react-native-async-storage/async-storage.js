jest.mock(
  '@react-native-async-storage/async-storage/jest/async-storage-mock',
  () => ({
    AsyncStorage: {
      setItem: jest.fn(() => {
        return new Promise((resolve, reject) => {
          resolve('token');
        });
      }),
      getItem: jest.fn(() => {
        return new Promise((resolve, reject) => {
          resolve('token');
        });
      }),
    },
  }),
);
