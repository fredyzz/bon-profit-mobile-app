import {DrawerScreenProps} from '@react-navigation/drawer';
// import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useContext, useState} from 'react';
import {AuthContext} from '../../store/context/AuthContext'
import {Button, StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, TextInput, Alert} from 'react-native';
import {globalStyles} from '../../theme/appTheme';
import {Colors} from '../../theme/colors';
import {login} from '../../services/auth/login'
import {validateLoginForm} from '../../helpers/login'

// interface Props extends StackScreenProps<any, any> {}
interface Props extends DrawerScreenProps<any, any> {}
export const SuccessScreen = ({navigation}: Props) => {
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')

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

    const {authState, signIn} = useContext(AuthContext);

  useEffect( () => {
    if(!authState.isLoggedIn) {console.log('No esta logeado')}
    else {navigation.navigate('StackNavigator')}

  }, [authState])


  return (
    <SafeAreaView style={[globalStyles.globalMargin, styles.container]}>
     <Image
          style={styles.logo}
          source={require('../../images/success.gif')}
        />
      <Text style={[globalStyles.title, globalStyles.center]}>¡You made it!</Text>
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
  container: {flex: 1,
  justifyContent: 'center',
  alignItems: 'center'},
  logo: {
      width: 200,
      height: 200,
       resizeMode: 'contain',
  },
  btnContainer: {
      width:'100%',
      flexDirection: 'row',
      justifyContent:'center'},
  inputContainer: {
      width: '100%',
      alignItems: 'center',
      flexDirection:'column',
  },
  btnLogin: {backgroundColor: Colors.primary},
  btnMenu: {
    marginLeft: 20,
  },
});
