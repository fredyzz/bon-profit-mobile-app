import {useNavigation} from '@react-navigation/core';
import React, {useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {globalStyles} from '../theme/appTheme';

export const Page2screen = () => {
  const navigator = useNavigation();

  useEffect(() => {
    navigator.setOptions({
      title: 'Hello world',
      headerBackTitle: '',
    });
  }, [navigator]);

  return (
    <View style={[globalStyles.globalMargin, styles.container]}>
      <Text style={globalStyles.title}>Page 2</Text>
      <Button
        title="Go to page 3"
        onPress={() => navigator.navigate('Page3screen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});
