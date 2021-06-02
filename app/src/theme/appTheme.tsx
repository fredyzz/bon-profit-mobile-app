import {StyleSheet} from 'react-native';
import {Colors}  from './colors'

export const globalStyles = StyleSheet.create({
  globalMargin: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 30,
    marginTop:30,
    marginBottom: 10,
    textAlign: 'center',
    color: Colors.primary
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
  textButtonContainer: {
    width: 180,
    marginTop:30,
  },
  textButton:{
    textAlign: 'center',
    color: Colors.dark,
  },
   input: {
    height: 40,
    width: '60%',
    margin: 12,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.primary,
    textAlign: 'center',
    color: Colors.dark
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
  buttonDisabled: {
    backgroundColor: Colors.disabled,
  }
});
