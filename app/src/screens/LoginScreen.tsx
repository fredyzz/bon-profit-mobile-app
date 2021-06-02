import {DrawerScreenProps} from '@react-navigation/drawer';
// import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useContext, useState} from 'react';
import {AuthContext} from '../store/context/AuthContext'
import {Button, StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, TextInput} from 'react-native';
import {globalStyles} from '../theme/appTheme';
import {Colors} from '../theme/colors';
import {login} from '../services/auth/login'

// interface Props extends StackScreenProps<any, any> {}
interface Props extends DrawerScreenProps<any, any> {}
export const LoginScreen = ({navigation}: Props) => {
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')

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

    const {authState, signIn} = useContext(AuthContext);

  useEffect( () => {
    if(!authState.isLoggedIn) {console.log('No esta logeado')}
    else {navigation.navigate('StackNavigator')}

  }, [authState])

    const handleLogin = async () => {
        const loginResult = await login(emailInput, passwordInput)
        signIn(loginResult)
    }


  return (
    <SafeAreaView style={[globalStyles.globalMargin, styles.container]}>
     <Image
          style={styles.logo}
          source={require('../images/BonProfit-color.png')}
        />
      <Text style={[globalStyles.title, globalStyles.center]}>Bon Profit</Text>
      <View style={styles.inputContainer}>
         <TextInput
        style={globalStyles.input}
        placeholder='email'
        onChangeText={(value) => setEmailInput(value)}
        value={emailInput}
      />
      <TextInput
        style={globalStyles.input}
        secureTextEntry={true}
        placeholder='password'
        onChangeText={(value) => setPasswordInput(value)}
        value={passwordInput}
      />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={[globalStyles.bigButton, styles.btnLogin]}
          onPress={handleLogin}>
          <Text style={globalStyles.bigButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={[globalStyles.textButtonContainer]}
          onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={globalStyles.textButton}>¿Not registered yet? Click here to register</Text>
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
