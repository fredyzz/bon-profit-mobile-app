/* eslint-disable react-hooks/exhaustive-deps */
import {DrawerScreenProps} from '@react-navigation/drawer';
import React, {useEffect, useContext, useState} from 'react';
import {AuthContext} from '../../store/context/AuthContext';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {globalStyles} from '../../theme/appTheme';
import {Colors} from '../../theme/colors';
import {login} from '../../services/auth/login';
import {validateLoginForm} from '../../helpers/login.validator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {env} from '../../../.env';

const STORAGE_KEY = env.CONSTANTS.STORAGE_KEY;

interface Props extends DrawerScreenProps<any, any> {}

export const LoginScreen = ({navigation}: Props) => {
  const {authState, signIn} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const saveToken = async (value: string) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      Alert.alert('Failed to save the data to the storage');
    }
  };

  const readToken = async () => {
    try {
      const storageToken = await AsyncStorage.getItem(STORAGE_KEY);

      if (storageToken !== null) {
        setToken(storageToken);
      }
    } catch (e) {
      Alert.alert('Failed to fetch the data from storage');
    }
  };

  const loginWithToken = async () => {
    if (token) {
      const loginResult = await login(undefined, undefined, token);
      signIn(loginResult);
    }
  };

  const clearForm = () => {
    setEmail('');
    setPassword('');
  };
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          testID="login-btnMenu"
          style={styles.btnMenu}
          onPress={() => navigation.toggleDrawer()}>
          <Text>Menu</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (authState.isLoggedIn) {
      navigation.navigate('SuccessScreen');
    } else {
      readToken();
    }
  }, [authState]);

  useEffect(() => {
    loginWithToken();
  }, [token]);

  const handleLogin = async () => {
    const {isValid, message} = validateLoginForm({
      email,
      password,
    });
    if (!isValid) {
      Alert.alert('Something went wrong', message);
    } else {
      const {
        success,
        message: errorMessage,
        ...loginResult
      } = await login(email, password, token);
      if (success && loginResult.token) {
        clearForm();
        saveToken(loginResult.token);
        signIn(loginResult);
      }
      if (!success) {
        Alert.alert('Something went wrong', errorMessage);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={[globalStyles.globalMargin, styles.container]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.innerContainer}>
          <Image
            style={styles.logo}
            source={require('../../images/BonProfit-color.png')}
          />
          <Text style={[globalStyles.title]}>Bon Profit</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={globalStyles.input}
              placeholder="email"
              placeholderTextColor={Colors.primary}
              onChangeText={value => setEmail(value.toLowerCase())}
              value={email}
            />
            <TextInput
              style={globalStyles.input}
              secureTextEntry={true}
              placeholder="password"
              placeholderTextColor={Colors.primary}
              onChangeText={value => setPassword(value)}
              value={password}
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
              <Text style={globalStyles.textButton}>
                ¿Not registered yet? Click here to register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logo: {
    height: '20%',
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
