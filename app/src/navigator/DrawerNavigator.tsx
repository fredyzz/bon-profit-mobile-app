import React from 'react';
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
import {LoginScreen} from '../screens/LoginScreen';
import {SettingsScreen} from '../screens/SettingsScreen';
import {RegisterScreen} from '../screens/RegisterScreen'
import {globalStyles} from '../theme/appTheme';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Drawer = createDrawerNavigator(

);

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
        name="SettingsScreen"
        options={{title: 'Settings'}}
        component={SettingsScreen}
      />
      <Drawer.Screen
        name="StackNavigator"
        options={{title: 'Home'}}
        component={StackNavigator}
      />
      
    </Drawer.Navigator>
  );
};

const DrawerContent = ({
  navigation,
}: DrawerContentComponentProps<DrawerContentOptions>) => {

  return (
    <DrawerContentScrollView>
      <View>
        <Image
          style={globalStyles.avatar}
          source={{
            uri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
          }}
        />
      </View>

      <View style={globalStyles.drawerMenuContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('StackNavigator')}
          style={globalStyles.drawerMenuItem}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.drawerMenuItem}
          onPress={() => navigation.navigate('SettingsScreen')}>
          <Text>
            Settings
          </Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};
