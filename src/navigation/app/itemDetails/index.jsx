import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../../../screens/Dashboard';
import ItemDetails from '../../../screens/ItemDetails';
import Payment from '../../../screens/Payment';

const Stack = createNativeStackNavigator();

const ItemDetailStack = () => {
return(
  <Stack.Navigator screenOptions={{ headerShown: false}}>
    <Stack.Screen
    name="Home"
    component={Dashboard}
    />
    <Stack.Screen
    name="ItemDetail"
    component={ItemDetails}
    />
    <Stack.Screen
    name="Payment"
    component={Payment}
    />
  </Stack.Navigator>
)
}

export default ItemDetailStack;