import {StyleSheet} from 'react-native';
import {Colors} from './colors';

export const globalStyles = StyleSheet.create({
  globalMargin: {
    marginHorizontal: 20,
  },
  frameContainer: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  frame: {
    width: '100%',
    height: '95%',
    borderTopEndRadius: 100,
    borderTopStartRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 30,
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'center',
    color: Colors.primary,
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
    marginTop: 30,
  },
  textButton: {
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
    color: Colors.dark,
  },
  avatar: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
  },
  menuItemText: {
    paddingTop: 7,
    paddingLeft: 7,
    height: 30,
  },
  cardTitle: {
    fontSize: 30,
  },
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    marginLeft: 2,
    color: Colors.dark,
  },
  drawerMenuContainer: {
    flexDirection: 'column',
    marginLeft: 90,
    marginTop: 50,
  },
  drawerMenuItem: {
    marginBottom: 40,
    fontSize: 20,
  },
  btnMenu: {
    backgroundColor: Colors.white,
    marginTop: 30,
    marginLeft: 30,
    width: 50,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnMenuRight: {
    marginLeft: 0,
    marginRight: 30,
  },
  buttonDisabled: {
    backgroundColor: Colors.disabled,
  },
});
