import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import {Page1screen} from '../screens/Page1screen';
import {ScanScreen} from '../screens/ScanScreen';
import {Page3screen} from '../screens/Page3screen';
import {PersonScreen} from '../screens/PersonScreen';
import {Colors} from '../theme/colors';

export type RootStackParams = {
  Page1screen: undefined;
  Page2screen: undefined;
  Page3screen: undefined;
  PersonScreen: {id: number; name: string};
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      // initialRouteName="Page2screen"
      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
        },
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      {/* <Stack.Screen
        name="LoginScreen"
        options={{title: 'Login'}}
        component={Page1screen}
      /> */}
      {/* <Stack.Screen
        name="Page1screen"
        options={{title: 'Page 1'}}
        component={ScanScreen}
      /> */}
      <Stack.Screen
        name="ScanScreen"
        options={{
          title: '',
          headerStyle: {
            backgroundColor: Colors.primary,
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            },
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        component={ScanScreen}
      />
      <Stack.Screen
        name="Page3screen"
        options={{title: 'Page 3'}}
        component={Page3screen}
      />
      <Stack.Screen
        name="PersonScreen"
        options={{title: 'Person screen'}}
        component={PersonScreen}
      />
    </Stack.Navigator>
  );
};
