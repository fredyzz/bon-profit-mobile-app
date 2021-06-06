import React, {useContext} from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {
  useWindowDimensions,
  View,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import {StackNavigator} from './StackNavigator';
import {LoginScreen} from '../screens/auth/LoginScreen';
import {SettingsScreen} from '../screens/SettingsScreen';
import {RegisterScreen} from '../screens/auth/RegisterScreen';
import {SuccessScreen} from '../screens/common/SuccessScreen';
import {globalStyles} from '../theme/appTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../store/context/AuthContext/';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  const {width} = useWindowDimensions();

  return (
    <Drawer.Navigator
      drawerType={width >= 768 ? 'slide' : 'front'}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="LoginScreen"
        options={{title: 'Login'}}
        component={LoginScreen}
      />
      <Drawer.Screen
        name="RegisterScreen"
        options={{title: 'Register'}}
        component={RegisterScreen}
      />
      <Drawer.Screen
        name="SuccessScreen"
        options={{title: 'Success'}}
        component={SuccessScreen}
      />
      <Drawer.Screen
        name="SettingsScreen"
        options={{title: 'Settings'}}
        component={SettingsScreen}
      />
      <Drawer.Screen
        options={{
          title: 'Home',
          gestureEnabled: false,
        }}
        name="StackNavigator"
        component={StackNavigator}
      />
    </Drawer.Navigator>
  );
};

const DrawerContent = ({
  navigation,
}: DrawerContentComponentProps<DrawerContentOptions>) => {
  const {signOut} = useContext(AuthContext);
  return (
    <DrawerContentScrollView>
      <View>
        <Image
          style={globalStyles.avatar}
          source={require('../images/avatar-placeholder.png')}
        />
      </View>

      <View style={globalStyles.drawerMenuContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('StackNavigator')}
          style={globalStyles.drawerMenuItem}>
          <View style={globalStyles.menuItem}>
            <Icon name="qr-code-outline" style={globalStyles.icon} />
            <Text style={globalStyles.menuItemText}>Menu</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.drawerMenuItem}
          onPress={() => navigation.navigate('SettingsScreen')}>
          <View style={globalStyles.menuItem}>
            <Icon name="options-outline" style={globalStyles.icon} />
            <Text style={globalStyles.menuItemText}>Settings</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.drawerMenuItem} onPress={signOut}>
          <View style={globalStyles.menuItem}>
            <Icon name="log-out-outline" style={globalStyles.icon} />
            <Text style={globalStyles.menuItemText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};
