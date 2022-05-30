import React, { useContext } from "react";
import { useNavigation } from '@react-navigation/native';
import {View, Text, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Image} from 'react-native'
import tw from '../../../tailwind';
import CustomInput from '../../components/inputText';
import { AppContext } from '../../../App';

const Login = () => {
  const navigate = useNavigation();
  const {setAuth} = useContext(AppContext);

  return(
    <KeyboardAvoidingView>
    <View style={[styles.container, tw`p-6 h-full pt-10 justify-between`]}>
      <View>
        <View style={tw`items-center my-10`}>
        <Image source={require("../../../assets/logo.png")} style={{ height: 100, width: 100}} />
        </View>
        <Text style={tw`text-center font-poppins-regular text-[14px]`}>Welcome Back, we’ve missed you!</Text>
        <CustomInput placeholder="Phone Number" />
        <CustomInput placeholder="Password" />
        <View style={tw`w-full items-center mt-10`}>
        <TouchableOpacity onPress={()=> setAuth(true)} style={tw`bg-black h-[60px] justify-center items-center w-[50] rounded-md`}>
          <Text style={tw`text-white font-poppins-medium text-[14px]`}>Login</Text>
        </TouchableOpacity>
        </View>
      </View>
      <View>
      <View style={tw`flex-row mt-2 justify-center items-center`}>
        <Text style={tw`font-poppins-regular text-2C2 text-[14px]`}>Don’t have an account? </Text>
        <TouchableOpacity onPress={()=> navigate.navigate("Register")}>
          <Text style={tw`font-poppins-bold`}>REGISTER HERE</Text>
        </TouchableOpacity>
        </View>
      <View style={tw`flex-row mt-2 justify-center items-center`}>
        <Text style={tw`font-poppins-regular text-2C2 text-[14px]`}>Forgot your password?? </Text>
        <TouchableOpacity onPress={()=> navigate.navigate("Register")}>
          <Text style={tw`font-poppins-bold`}>RECOVER IT HERE</Text>
        </TouchableOpacity>
        </View>
        {/* <Text style={tw`w-full text-center text-E5E font-poppins-regular`}>Forgot password?</Text> */}
      </View>
    </View>
    </KeyboardAvoidingView>
  )
}


const styles = StyleSheet.create({
})
export default Login;