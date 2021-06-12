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
  Keyboard,
  TextInput,
  Alert,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import {globalStyles} from '../../theme/appTheme';
import {Colors} from '../../theme/colors';
import {validateRegisterForm} from '../../helpers/register.validator';
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

  const clearForm = () => {
    setName('');
    setLastName('');
    setPhone('');
    setEmail('');
    setPassword('');
    setPasswordRepeat('');
  };

  useEffect(() => {
    if (authState.isLoggedIn) {
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
        clearForm();
        navigation.navigate('SuccessScreen');
      } else {
        Alert.alert('Something went wrong', registerMessage);
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
          <Text style={[globalStyles.title]}>Register</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={globalStyles.input}
              placeholder="name"
              placeholderTextColor={Colors.primary}
              onChangeText={value => setName(value)}
              value={name}
            />
            <TextInput
              style={globalStyles.input}
              placeholder="lastname"
              placeholderTextColor={Colors.primary}
              onChangeText={value => setLastName(value)}
              value={lastname}
            />
            <TextInput
              style={globalStyles.input}
              placeholder="phone"
              placeholderTextColor={Colors.primary}
              onChangeText={value => setPhone(value)}
              value={phone}
            />
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
            <TextInput
              style={globalStyles.input}
              secureTextEntry={true}
              placeholder="repeat password"
              placeholderTextColor={Colors.primary}
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
    height: '10%',
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
