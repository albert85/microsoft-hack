import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from '@expo/vector-icons/FontAwesome5';
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import tw from '../../../tailwind';
import CustomInput from '../../components/inputText';
import {firestoreStore, app as auth, firebaseAuth } from '../../../firebase.config';

const Registration = () => {
  const myDbAuth = firestoreStore.getFirestore()
  const navigate = useNavigation();
  const [viewPsd, setViewPsd] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({ firstName: '', lastName: '', email: '', password: '', phone: ''})

  const handleUserInput = (field, value) => {
    setUserDetails(prev => ({...prev, [field]: value}))
  }

  const handleSubmitButton = async () => {
    setLoading(true);
    try {
      const userCredentials = await firebaseAuth.createUserWithEmailAndPassword(auth, userDetails.email, userDetails.password);
      const collectionRef = firestoreStore.doc(myDbAuth, "users/", userCredentials.user.uid);
      const user = await firestoreStore.setDoc(collectionRef,{
        firstName: userDetails.firstName,
        email: userDetails.email,
        lastName: userDetails.lastName,
        phone: userDetails.phone,
      })
      
      console.log(user)
      
    } catch (error) {
     console.log(error) 
    }
    setLoading(false);
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View style={[styles.container, tw`p-6 h-full pt-10 justify-between`]}>
          <View>
            <View style={tw`items-center my-10`}>
              <Image
                source={require('../../../assets/logo.png')}
                style={{ height: 100, width: 100 }}
              />
            </View>
            <Text style={tw`text-center font-poppins-regular text-[14px]`}>
              Lets get you started already
            </Text>
            <CustomInput onChangeText={(text) => handleUserInput("firstName", text)} placeholder="First Name" />
            <CustomInput onChangeText={(text) => handleUserInput("lastName", text)} placeholder="Last Name" />
            <CustomInput onChangeText={(text) => handleUserInput("phone", text)} placeholder="Phone Number" />
            <CustomInput onChangeText={(text) => handleUserInput("email", text)} placeholder="Email Address" />
            <View style={tw`relative`}>
              <CustomInput onChangeText={(text) => handleUserInput("password", text)} secureTextEntry={viewPsd} placeholder="Password" />
              <View style={tw`absolute bottom-1/5 right-6`}>
                {!viewPsd && (
                  <TouchableOpacity onPress={() => setViewPsd((prev) => !prev)}>
                    <Icon name="eye" size={20} />
                  </TouchableOpacity>
                )}
                {viewPsd && (
                  <TouchableOpacity onPress={() => setViewPsd((prev) => !prev)}>
                    <Icon name="eye-slash" size={20} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={tw`w-full items-center mt-10`}>
              <TouchableOpacity
                onPress={handleSubmitButton}
                disabled={loading}
                style={tw`bg-black h-[60px] justify-center items-center w-[50] rounded-md`}
              >
                <Text style={tw`text-white font-poppins-medium text-[14px]`}>
                  {loading ? "Loading..." : "Register"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={tw`flex-row mt-10 justify-center items-center`}>
              <Text style={tw`font-poppins-regular text-2C2 text-[14px]`}>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigate.goBack()}>
                <Text style={tw`font-poppins-bold`}>LOGIN HERE</Text>
              </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({});
export default Registration;
