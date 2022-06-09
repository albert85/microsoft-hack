import * as React from 'react';
import {View, Image, Text} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../../screens/Dashboard';
import tw from '../../../tailwind';
import {MaterialIcons} from '@expo/vector-icons'
import ItemDetailStack from './itemDetails';
import VoiceSearch from '../../screens/VoiceSearch';
import Account from '../../screens/Account';
import OrderStack from './orders';

const Stack = createBottomTabNavigator();

const AppStack = () => {
return(
  <Stack.Navigator screenOptions={{ 
    headerShown: false,
    tabBarStyle:{backgroundColor:"#fff", height:70, paddingTop:5},
    // tabBarLabelStyle:{fontSize:8, fontFamily:"Poppins_300Light", padding:5}
  }}>
    <Stack.Screen
    name="Dashboard"
    component={ItemDetailStack}
    options={{
      tabBarShowLabel: false,
      tabBarIcon: ({ focused }) => (<View style={tw`items-center p-3`}>
        <MaterialIcons name="home" size={25} color={focused ? 'black' : '#E3E3E3'} />
        <Text style={[{ color: focused ? 'black': '#E3E3E3', fontFamily:"Poppins_300Light"}, tw`text-[10px]`]}>Home</Text>
      </View>)
    }}
    />
    <Stack.Screen
    name="Voice"
    component={VoiceSearch}
    options={{
      tabBarShowLabel: false,
      tabBarIcon: ({ focused }) => (<View style={tw`items-center p-3`}>
        <MaterialIcons name="record-voice-over" size={25} color={focused ? 'black' : '#E3E3E3'} />
        <Text style={[{ color: focused ? 'black': '#E3E3E3', fontFamily:"Poppins_300Light"}, tw`text-[10px]`]}>Voice Search</Text>
      </View>)
    }}
    />
    <Stack.Screen
    name="Orders"
    component={OrderStack}
    options={{
      tabBarShowLabel: false,
      tabBarIcon: ({ focused }) => (<View style={tw`items-center p-3`}>
        <MaterialIcons name="shopping-cart" size={25} color={focused ? 'black' : '#E3E3E3'} />
        <Text style={[{ color: focused ? 'black': '#E3E3E3', fontFamily:"Poppins_300Light"}, tw`text-[10px]`]}>My Orders</Text>
      </View>)
    }}
    />
    <Stack.Screen
    name="Accounts"
    component={Account}
    options={{
      tabBarShowLabel: false,
      tabBarIcon: ({ focused }) => (<View style={tw`items-center p-3`}>
        <MaterialIcons name="person" size={25} color={focused ? 'black' : '#E3E3E3'} />
        <Text style={[{ color: focused ? 'black': '#E3E3E3', fontFamily:"Poppins_300Light"}, tw`text-[10px]`]}>Account</Text>
      </View>)
    }}
    />
  </Stack.Navigator>
)
}

export default AppStack;