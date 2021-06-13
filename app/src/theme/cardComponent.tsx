import {StyleSheet} from 'react-native';
import {Colors} from './colors';

export const cardComponent = StyleSheet.create({
  actionButton: {
    width: 50,
    height: 50,
    marginRight: 0,

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 4,
  },
  actionButtonLeft: {
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
  actionButtonRight: {
    marginLeft: 10,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
  },
  actionButtonText: {color: Colors.white},
});
