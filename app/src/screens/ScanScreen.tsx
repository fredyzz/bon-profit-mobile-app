import {useNavigation} from '@react-navigation/core';
import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Linking,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
// import {globalStyles} from '../theme/appTheme';
import {Colors} from '../theme/colors';
import QRCodeScanner from 'react-native-qrcode-scanner';

export const ScanScreen = () => {
  const navigation: any = useNavigation();

  const onSuccess = (event: {data: string}) => {
    Linking.openURL(event.data).catch(err =>
      console.error('An error occured', err),
    );
  };

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

  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <Image
          style={styles.logo}
          source={require('../images/BonProfit-color.png')}
        />
        <View style={styles.scanner}>
          <QRCodeScanner cameraStyle={styles.camera} onRead={onSuccess} />
        </View>
        <View style={styles.instructions}>
          <Text style={styles.instructionsText}>Scan the QR of the table</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  frame: {
    width: '100%',
    height: '95%',
    borderTopEndRadius: 100,
    borderTopStartRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  logo: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    marginBottom: 40,
    marginTop: -120,
  },

  scanner: {
    width: 250,
    height: 250,
  },
  camera: {
    overflow: 'hidden',
    height: 250,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  btnMenu: {
    backgroundColor: Colors.white,
    marginTop: 30,
    marginLeft: 30,
    width: 50,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  instructions: {
    marginTop: 40,
  },
  instructionsText: {
    fontSize: 30,
    color: Colors.primary,
  },
});
