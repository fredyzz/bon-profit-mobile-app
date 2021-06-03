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
import QRCodeScanner from 'react-native-qrcode-scanner';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalStyles} from '../theme/appTheme';
import {Colors} from '../theme/colors';

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
        <TouchableOpacity
          style={globalStyles.btnMenu}
          onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu-outline" style={globalStyles.icon} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={globalStyles.frameContainer}>
      <View style={globalStyles.frame}>
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
  instructions: {
    marginTop: 40,
  },
  instructionsText: {
    fontSize: 30,
    color: Colors.primary,
  },
});
