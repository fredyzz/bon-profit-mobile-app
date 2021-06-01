import {DrawerScreenProps} from '@react-navigation/drawer';
// import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useContext, useState} from 'react';
import {AuthContext} from '../store/context/AuthContext'
import {Button, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput} from 'react-native';
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
      <Text style={[globalStyles.title, globalStyles.center]}>Login</Text>
      <View style={styles.inputContainer}>
         <TextInput
        style={globalStyles.input}
        placeholder='email'
        onChangeText={(value) => setEmailInput(value)}
        value={emailInput}
      />
      <TextInput
        style={globalStyles.input}
         placeholder='password'
        onChangeText={(value) => setPasswordInput(value)}
        value={passwordInput}
      />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={[globalStyles.bigButton, styles.btnBgRed]}
          onPress={handleLogin}>
          <Text style={globalStyles.bigButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1,
  alignItems: 'center'},
  btnContainer: {
      width:'100%',
      flexDirection: 'row',
      justifyContent:'center'},
  inputContainer: {
      width: '100%',
      alignItems: 'center',
      flexDirection:'column',
  },
  btnBgRed: {backgroundColor: 'red'},
  btnMenu: {
    marginLeft: 20,
  },
});
