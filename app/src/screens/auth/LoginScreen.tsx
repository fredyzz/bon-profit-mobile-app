import {DrawerScreenProps} from '@react-navigation/drawer';
import React, {useEffect, useContext, useState} from 'react';
import {AuthContext} from '../../store/context/AuthContext';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import {globalStyles} from '../../theme/appTheme';
import {Colors} from '../../theme/colors';
import {login} from '../../services/auth/login';
import {validateLoginForm} from '../../helpers/login';

interface Props extends DrawerScreenProps<any, any> {}

export const LoginScreen = ({navigation}: Props) => {
  const {authState, signIn} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  useEffect(() => {
    if (authState.isLoggedIn) {
      navigation.navigate('SuccessScreen');
    }
  }, [authState, navigation]);

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
      } = await login(email, password);
      if (success) {
        signIn(loginResult);
      }
      if (!success) {
        Alert.alert('Something went wrong', errorMessage);
      }
    }
  };

  return (
    <SafeAreaView style={[globalStyles.globalMargin, styles.container]}>
      <Image
        style={styles.logo}
        source={require('../../images/BonProfit-color.png')}
      />
      <Text style={[globalStyles.title]}>Bon Profit</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={globalStyles.input}
          placeholder="email"
          onChangeText={value => setEmail(value)}
          value={email}
        />
        <TextInput
          style={globalStyles.input}
          secureTextEntry={true}
          placeholder="password"
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
