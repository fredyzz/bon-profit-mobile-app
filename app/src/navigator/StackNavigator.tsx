import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Page1screen} from '../screens/Page1screen';
import {Page2screen} from '../screens/Page2screen';
import {Page3screen} from '../screens/Page3screen';
import {PersonScreen} from '../screens/PersonScreen';

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
      <Stack.Screen
        name="Page1screen"
        options={{title: 'Page 1'}}
        component={Page1screen}
      />
      <Stack.Screen
        name="Page2screen"
        options={{title: 'Page 2'}}
        component={Page2screen}
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
