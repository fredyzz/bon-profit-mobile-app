import {StyleSheet} from 'react-native';
import {Colors} from './colors';

export const headerScreen = StyleSheet.create({
  headerTitle: {
    alignItems: 'center',
    marginTop: 120,
  },
  container: {
    flex: 1,
    paddingTop: 20,
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: 100,
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  title: {
    color: Colors.resalt,
    marginTop: -0,
    fontSize: 32,
  },
  btnCartTextContainer: {
    borderRadius: 100,
    width: 24,
    height: 24,
    backgroundColor: Colors.dark,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
    marginBottom: -4,
    marginLeft: 15,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 50,
  },
  btnLogin: {backgroundColor: Colors.primary},
  btnCartText: {
    color: Colors.primary,
    fontSize: 12,
  },
  totalContainer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 26,
    color: Colors.dark,
  },
  btnTabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  btnTab: {
    flex: 1,
    width: '80%',
    padding: 2,
    marginTop: 3,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  btnTabText: {
    color: Colors.white,
  },
});
