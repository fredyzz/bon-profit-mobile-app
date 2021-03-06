import {useNavigation} from '@react-navigation/core';
import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAuth} from '../../hooks/UseAuth';
import {validateQr, Scan} from '../../helpers/qr.validator';
import {globalStyles} from '../../theme/appTheme';
import {Colors} from '../../theme/colors';

export const ScanScreen = () => {
  useAuth();
  const navigation: any = useNavigation();
  const isFocused = useIsFocused();

  const onSuccess = ({data}: {data: string}) => {
    const {success, restaurantId, tableId}: Scan = validateQr(data);
    if (success) {
      navigation.navigate('RestaurantScreen', {
        restaurantId,
        tableId,
      });
    } else {
      Alert.alert('Please scan a valid QR');
    }
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
          source={require('../../images/BonProfit-color.png')}
        />
        <View style={styles.scanner}>
          {isFocused && (
            <QRCodeScanner
              cameraStyle={styles.camera}
              onRead={onSuccess}
              reactivate={isFocused}
              reactivateTimeout={3000}
            />
          )}
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
