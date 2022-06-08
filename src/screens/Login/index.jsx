import React, { useContext, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import {View, Text, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Image} from 'react-native'
import tw from '../../../tailwind';
import CustomInput from '../../components/inputText';
import { AppContext } from '../../../App';
import { firebaseAuth, app as appAuth } from '../../../firebase.config';

const Login = () => {
  const navigate = useNavigation();
  const {setAuth} = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({email: '', password: ''})

  const handleUserIput = (field, value) => {
    setUserDetails((prev) => ({...prev, [field]: value}));
  }

  const handleSubmit = async () => {
    try {
      const userCredential = await firebaseAuth.signInWithEmailAndPassword(appAuth, userDetails.email, userDetails.password)
      if(userCredential.user !== null){
       setAuth(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <KeyboardAvoidingView>
    <View style={[styles.container, tw`p-6 h-full pt-10 justify-between`]}>
      <View>
        <View style={tw`items-center my-10`}>
        <Image source={require("../../../assets/logo.png")} style={{ height: 100, width: 100}} />
        </View>
        <Text style={tw`text-center font-poppins-regular text-[14px]`}>Welcome Back, we’ve missed you!</Text>
        <CustomInput editable={!loading} onChangeText={(text) => handleUserIput("email", text)} placeholder="Email Address" />
        <CustomInput editable={!loading} onChangeText={(text) => handleUserIput("password", text)} placeholder="Password" secureTextEntry />
        <View style={tw`w-full items-center mt-10`}>
        <TouchableOpacity disabled={loading} onPress={handleSubmit} style={tw`bg-black h-[60px] justify-center items-center w-[50] rounded-md`}>
          <Text style={tw`text-white font-poppins-medium text-[14px]`}>{ loading ? "Loading..." : "Login"}</Text>
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