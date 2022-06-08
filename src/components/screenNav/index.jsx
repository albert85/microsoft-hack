import React, { useContext } from "react";
import {View, Text, Image, TouchableOpacity} from 'react-native';
import tw from '../../../tailwind';
// import Icon from "@expo/vector-icons/FontAwesome5"
import {MaterialIcons} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../../App';
import { firebaseAuth, app } from '../../../firebase.config';

const ScreenNavigation = ({ title = "", homeNav = true, remove = true }) => {
  const navigate = useNavigation();
  const {setAuth} = useContext(AppContext);
  return (
    <View style={tw`py-10 pt-12 pl-5 pb-5 flex-row justify-between items-center bg-white w-full mb-[26px] shadow-lg`}>
      {remove && (<TouchableOpacity onPress={ async ()=> {
        if(homeNav){
          await firebaseAuth.signOut(app);
          setAuth(false);
        }else {
          navigate.goBack();
        }
      }}>
        {!homeNav && (<MaterialIcons name="arrow-back" size={25} color="black" />)}
        {homeNav && (<MaterialIcons name="logout" size={30} color="#F93972" />)}
      </TouchableOpacity>)}
      {
        !remove && <View />
      }
    <Text style={tw`font-poppins text-[20px]`}>{title}</Text>
    <View />
  </View>
  )
}

export default ScreenNavigation;