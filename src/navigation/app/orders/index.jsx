import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Orders from '../../../screens/Orders';
import OrderDetails from '../../../screens/OrderDetails';

const Stack = createNativeStackNavigator();

const OrderStack = () => {
return(
  <Stack.Navigator screenOptions={{ headerShown: false}}>
    <Stack.Screen
    name="OrdersList"
    component={Orders}
    />
    <Stack.Screen
    name="OrderDetail"
    component={OrderDetails}
    />
  </Stack.Navigator>
)
}

export default OrderStack;