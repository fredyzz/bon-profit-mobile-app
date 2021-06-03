import {DrawerScreenProps} from '@react-navigation/drawer';
// import {StackScreenProps} from '@react-navigation/stack';
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
import {validateRegisterForm} from '../../helpers/register';
import {register} from '../../services/auth/register';

// interface Props extends StackScreenProps<any, any> {}
interface Props extends DrawerScreenProps<any, any> {}
export const RegisterScreen = ({navigation}: Props) => {
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const [registerButttonDisabled, setRegisterButttonDisabled] = useState(true);

  const {authState} = useContext(AuthContext);

  useEffect(() => {
    if (!authState.isLoggedIn) {
      console.log('No esta logeado');
    } else {
      navigation.navigate('StackNavigator');
    }
  }, [authState, navigation]);

  useEffect(() => {
    if (name || lastname || phone || email || password || passwordRepeat) {
      setRegisterButttonDisabled(false);
    } else {
      setRegisterButttonDisabled(true);
    }
  }, [name, lastname, phone, email, password, passwordRepeat]);

  const handleRegister = async () => {
    const {isValid, message} = validateRegisterForm({
      name,
      lastname,
      phone,
      email,
      password,
      passwordRepeat,
    });
    if (!isValid) {
      Alert.alert('Something went wrong', message);
    } else {
      const {success, message: registerMessage} = await register({
        name,
        lastname,
        phone,
        email,
        password,
      });
      if (success) {
        navigation.navigate('SuccessScreen');
      } else {
        Alert.alert('Something went wrong', registerMessage);
      }
    }
  };

  return (
    <SafeAreaView style={[globalStyles.globalMargin, styles.container]}>
      <Image
        style={styles.logo}
        source={require('../../images/BonProfit-color.png')}
      />
      <Text style={[globalStyles.title]}>Register</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={globalStyles.input}
          placeholder="name"
          onChangeText={value => setName(value)}
          value={name}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="lastname"
          onChangeText={value => setLastName(value)}
          value={lastname}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="phone"
          onChangeText={value => setPhone(value)}
          value={phone}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="email"
          onChangeText={value => setEmail(value.toLowerCase())}
          value={email}
        />
        <TextInput
          style={globalStyles.input}
          secureTextEntry={true}
          placeholder="password"
          onChangeText={value => setPassword(value)}
          value={password}
        />
        <TextInput
          style={globalStyles.input}
          secureTextEntry={true}
          placeholder="repeat password"
          onChangeText={value => setPasswordRepeat(value)}
          value={passwordRepeat}
        />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          disabled={registerButttonDisabled}
          style={[
            globalStyles.bigButton,
            styles.btnLogin,
            registerButttonDisabled && globalStyles.buttonDisabled,
          ]}
          onPress={handleRegister}>
          <Text style={globalStyles.bigButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={[globalStyles.textButtonContainer]}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={globalStyles.textButton}>
            ¿Registered yet? Click here to login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center'},
  logo: {
    width: 100,
    height: 100,
    marginTop: 30,
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
