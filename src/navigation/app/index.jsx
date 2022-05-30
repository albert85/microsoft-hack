import * as React from 'react';
import {View, Image, Text} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../../screens/Dashboard';
import tw from '../../../tailwind';
import {MaterialIcons} from '@expo/vector-icons'
import ItemDetailStack from './itemDetails';
import VoiceSearch from '../../screens/VoiceSearch';
import Account from '../../screens/Account';

const Stack = createBottomTabNavigator();

const AppStack = () => {
return(
  <Stack.Navigator screenOptions={{ headerShown: false}}>
    <Stack.Screen
    name="Dashboard"
    component={ItemDetailStack}
    options={{
      tabBarShowLabel: false,
      tabBarIcon: ({ focused }) => (<View style={tw`items-center p-3`}>
        <MaterialIcons name="home" size={35} color={focused ? 'black' : '#E3E3E3'} />
        {/* <Image source={require("../../../assets/home.png")}
        style={{
          height: 20,
          width: 20,
          tintColor: focused ? 'black' : '#E3E3E3'
        }}
        /> */}
        <Text style={[{ color: focused ? 'black': '#E3E3E3'}, tw`text-[12px]`]}>Home</Text>
      </View>)
    }}
    />
    <Stack.Screen
    name="Voice"
    component={VoiceSearch}
    options={{
      tabBarShowLabel: false,
      tabBarIcon: ({ focused }) => (<View style={tw`items-center p-3`}>
        <MaterialIcons name="record-voice-over" size={35} color={focused ? 'black' : '#E3E3E3'} />
        {/* <Image source={require("../../../assets/voice.png")}
        style={{
          height: 20,
          width: 20,
          tintColor: focused ? 'black' : '#E3E3E3'
        }}
        /> */}
        <Text style={[{ color: focused ? 'black': '#E3E3E3'}, tw`text-[12px]`]}>Voice Search</Text>
      </View>)
    }}
    />
    <Stack.Screen
    name="Orders"
    component={Dashboard}
    options={{
      tabBarShowLabel: false,
      tabBarIcon: ({ focused }) => (<View style={tw`items-center p-3`}>
        <MaterialIcons name="shopping-cart" size={35} color={focused ? 'black' : '#E3E3E3'} />
        {/* <Image source={require("../../../assets/cart.png")}
        style={{
          height: 20,
          width: 20,
          tintColor: focused ? 'black' : '#E3E3E3'
        }}
        /> */}
        <Text style={[{ color: focused ? 'black': '#E3E3E3'}, tw`text-[12px]`]}>My Orders</Text>
      </View>)
    }}
    />
    <Stack.Screen
    name="Accounts"
    component={Account}
    options={{
      tabBarShowLabel: false,
      tabBarIcon: ({ focused }) => (<View style={tw`items-center p-3`}>
        <MaterialIcons name="person" size={35} color={focused ? 'black' : '#E3E3E3'} />
        {/* <Image source={require("../../../assets/account.png")}
        style={{
          height: 20,
          width: 20,
          tintColor: focused ? 'black' : '#E3E3E3'
        }}
        /> */}
        <Text style={[{ color: focused ? 'black': '#E3E3E3'}, tw`text-[12px]`]}>Account</Text>
      </View>)
    }}
    />
  </Stack.Navigator>
)
}

export default AppStack;