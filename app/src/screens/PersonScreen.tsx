import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {RootStackParams} from '../navigator/StackNavigator';
import {globalStyles} from '../theme/appTheme';

// interface RouteParams {
//   id: number;
//   name: string;
// }

// interface Props extends StackScreenProps<any, any> {}

interface Props extends StackScreenProps<RootStackParams, 'PersonScreen'> {}
export const PersonScreen = ({route, navigation}: Props) => {
  //const params = route.params as RouteParams;

  const params = route!.params;
  useEffect(() => {
    navigation.setOptions({
      title: params.name,
    });
  }, [navigation, params]);

  return (
    <View style={globalStyles.globalMargin}>
      <Text style={globalStyles.title}>{JSON.stringify(params, null, 3)}</Text>
    </View>
  );
};
