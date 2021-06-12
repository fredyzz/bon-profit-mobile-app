/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalStyles} from '../../theme/appTheme';
import {Colors} from '../../theme/colors';
import {CartContext} from '../../store/context/CartContext';
import {AuthContext} from '../../store/context/AuthContext';
import {getAllOrders} from '../../services/orders';
import {OrdersContext} from '../../store/context/OrdersContext';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {ActiveOrders} from './ActiveOrders';
import {useFocusEffect} from '@react-navigation/native';

interface RouteParams {
  restaurantId: string;
  tableId: string;
}

export const OrdersScreen = () => {
  const navigation: any = useNavigation();
  const {
    cartState: {cart},
  } = useContext(CartContext);
  const {authState} = useContext(AuthContext);
  const {ordersState, loadOrders} = useContext(OrdersContext);

  useEffect(() => {
    if (!authState.isLoggedIn) {
      navigation.navigate('LoginScren');
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const getOrders = async () => {
        const orders = await getAllOrders(authState.token);
        loadOrders(orders);
      };
      getOrders();
    }, []),
  );

  useEffect(() => {
    navigation.setOptions({
      navigationOptions: {
        gesturesEnabled: false,
      },
      headerLeft: () => (
        <TouchableOpacity
          style={globalStyles.btnMenu}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" style={globalStyles.icon} />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <View style={styles.headerTitle}>
          <Text style={[globalStyles.title, styles.title]}>Cart</Text>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={[globalStyles.btnMenu, globalStyles.btnMenuRight]}
          onPress={() => navigation.goBack()}>
          <Icon name="checkmark-outline" style={globalStyles.icon} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, cart]);

  const Tab = createBottomTabNavigator();

  const FinishedOrders = () => (
    <View style={styles.totalContainer}>
      <Text style={styles.totalText}>Finished orders</Text>
    </View>
  );

  return ordersState.orders ? (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            let iconName;

            if (route.name === 'Active') {
              iconName = 'hourglass-outline';
            } else if (route.name === 'Finished') {
              iconName = 'checkbox-outline';
            }

            // You can return any component that you like here!
            return (
              <Icon
                name={iconName ? iconName : 'ellipsis-horizontal'}
                size={size}
                color={color}
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: Colors.primary,
          inactiveTintColor: Colors.dark,
        }}>
        <Tab.Screen name="Active" component={ActiveOrders} />
        <Tab.Screen name="Finished" component={FinishedOrders} />
        <Tab.Screen
          name="Button"
          component={ActiveOrders}
          options={{
            tabBarButton: () => (
              <TouchableOpacity
                style={styles.btnTabContainer}
                onPress={() =>
                  navigation.navigate('StackNavigator', {
                    screen: 'RestaurantScreen',
                  })
                }>
                <View style={styles.btnTab}>
                  <Text style={styles.btnTabText}>New Order</Text>
                </View>
              </TouchableOpacity>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  ) : (
    <Text>No products</Text>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    alignItems: 'center',
    marginTop: 120,
  },
  container: {
    flex: 1,
    paddingTop: 20,
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: 100,
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  title: {
    color: Colors.resalt,
    marginTop: -0,
    fontSize: 32,
  },
  btnCartTextContainer: {
    borderRadius: 100,
    width: 24,
    height: 24,
    backgroundColor: Colors.dark,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
    marginBottom: -4,
    marginLeft: 15,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 50,
  },
  btnLogin: {backgroundColor: Colors.primary},
  btnCartText: {
    color: Colors.primary,
    fontSize: 12,
  },
  totalContainer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 26,
    color: Colors.dark,
  },
  btnTabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  btnTab: {
    flex: 1,
    width: '80%',
    padding: 2,
    marginTop: 3,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  btnTabText: {
    color: Colors.white,
  },
});
