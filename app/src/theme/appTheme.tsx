import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
  globalMargin: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 30,
    marginTop:30,
    marginBottom: 10,
    textAlign: 'center',
  },
  bigButton: {
    width: 200,
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 10,
  },
  bigButtonText: {
    color: 'white',
    fontSize: 30,
  },
   input: {
    height: 40,
    width: '60%',
    margin: 12,
    borderRadius: 100,
    borderWidth: 1,
    textAlign: 'center'
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
