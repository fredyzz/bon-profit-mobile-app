import {DrawerScreenProps} from '@react-navigation/drawer';
import React, {useEffect, useContext} from 'react';
import {AuthContext} from '../store/context/AuthContext';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {globalStyles} from '../theme/appTheme';
import {Colors} from '../theme/colors';

interface Props extends DrawerScreenProps<any, any> {}
export const SuccessScreen = ({navigation}: Props) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
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
      navigation.navigate('StackNavigator');
    }
  }, [authState, navigation]);

  return (
    <SafeAreaView style={[globalStyles.globalMargin, styles.container]}>
      <Image style={styles.logo} source={require('../images/success.gif')} />
      <Text style={[globalStyles.title]}>¡You made it!</Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={[globalStyles.bigButton, styles.btnLogin]}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={globalStyles.bigButtonText}>Go to login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
  },
  btnLogin: {backgroundColor: Colors.primary},
  btnMenu: {
    marginLeft: 20,
  },
});
