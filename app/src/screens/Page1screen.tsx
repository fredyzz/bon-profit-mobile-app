import {DrawerScreenProps} from '@react-navigation/drawer';
// import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useContext} from 'react';
import {AuthContext} from '../store/context/AuthContext';
import {Button, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {globalStyles} from '../theme/appTheme';
import {Colors} from '../theme/colors';

// interface Props extends StackScreenProps<any, any> {}
interface Props extends DrawerScreenProps<any, any> {}
export const Page1screen = ({navigation}: Props) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        // <Button title="Menu" onPress={() => navigation.toggleDrawer()} />
        <TouchableOpacity
          style={styles.btnMenu}
          onPress={() => navigation.toggleDrawer()}>
          <Text>Menu</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const {authState} = useContext(AuthContext);

  useEffect(() => {
    if (authState.isLoggedIn) {
      console.log('Esta logeado');
    }
  }, [authState]);

  return (
    <View style={[globalStyles.globalMargin, styles.container]}>
      <Text style={globalStyles.title}>Page 1</Text>
      <Button
        title="Go to page 2"
        onPress={() => navigation.navigate('Page2screen')}
      />
      <Text>Navigate with arguments</Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={[globalStyles.bigButton, styles.btnBgRed]}
          onPress={() =>
            navigation.navigate('PersonScreen', {
              id: 1,
              name: 'Elvis',
            })
          }>
          <Text style={globalStyles.bigButtonText}>Elvis</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.bigButton}
          onPress={() =>
            navigation.navigate('PersonScreen', {
              id: 2,
              name: 'Tino',
            })
          }>
          <Text style={globalStyles.bigButtonText}>Tino</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  btnContainer: {flexDirection: 'row'},
  btnBgRed: {backgroundColor: 'red'},
  btnMenu: {
    marginLeft: 20,
  },
});
