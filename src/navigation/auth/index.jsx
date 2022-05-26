import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../screens/Login';
import Registration from '../../screens/Registration';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
return(
  <Stack.Navigator screenOptions={{ headerShown: false}}>
    <Stack.Screen
    name="Login"
    component={Login}
    />
    <Stack.Screen
    name="Register"
    component={Registration}
    />
  </Stack.Navigator>
)
}

export default AuthStack;