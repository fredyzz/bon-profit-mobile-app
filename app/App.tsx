/**
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import {StackNavigator} from './src/navigator/StackNavigator';
import {DrawerNavigator} from './src/navigator/DrawerNavigator';
import {AuthProvider} from './src/store/context/AuthContext';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <DrawerNavigator />
      </AuthProvider>
      {/* <StackNavigator /> */}
    </NavigationContainer>
  );
};

// const AppState = ({children}: any) => {
//   return <AuthProvider>{children}</AuthProvider>;
// };
export default App;
