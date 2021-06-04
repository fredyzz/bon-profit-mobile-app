import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {globalStyles} from '../theme/appTheme';

interface Props extends StackScreenProps<any, any> {}

interface RouteParams {
  restaurantId: string;
  tableId: string;
}

export const Page3screen = ({route, navigation}: Props) => {
  const params = route.params as RouteParams;
  return (
    <View style={[globalStyles.globalMargin, styles.container]}>
      <Text style={globalStyles.title}>
        {`restaurantId: ${params.restaurantId} tableId: ${params.tableId}`}
      </Text>
      <Button
        title="Go to page 2"
        onPress={() => navigation.navigate('Page2screen')}
      />
      <Button title="Go to page 1" onPress={() => navigation.popToTop()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});
