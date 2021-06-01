import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
  globalMargin: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
  },
  bigButton: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 10,
  },
  bigButtonText: {
    color: 'white',
    fontSize: 30,
  },
  avatar: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 20,
  },
  drawerMenuContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 50,
  },
  drawerMenuItem: {
    marginBottom: 40,
    fontSize: 20,
  },
});
