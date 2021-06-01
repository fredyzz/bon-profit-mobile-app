import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AuthContext} from '../store/context/AuthContext';
import {globalStyles} from '../theme/appTheme';

export const SettingsScreen = () => {
  const insets = useSafeAreaInsets();

  const {authState} = useContext(AuthContext);

  return (
    <View
      style={{
        ...globalStyles.globalMargin,
        marginTop: insets.top + 20,
      }}>
      <Text style={globalStyles.title}>Settings</Text>
      <Text>{JSON.stringify(authState, null, 4)}</Text>
    </View>
  );
};
