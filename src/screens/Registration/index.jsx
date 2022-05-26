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

const Registration = () => {
  const navigate = useNavigation();
  const [viewPsd, setViewPsd] = useState(true);
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
            <CustomInput placeholder="First Name" />
            <CustomInput placeholder="Last Name" />
            <CustomInput placeholder="Phone Number" />
            <View style={tw`relative`}>
              <CustomInput secureTextEntry={viewPsd} placeholder="Password" />
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
            <View style={tw`flex-row mt-2 justify-end items-center`}>
              <Text style={tw`font-poppins-regular text-2C2 text-[14px]`}>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigate.goBack()}>
                <Text style={tw`font-poppins-bold`}>Login</Text>
              </TouchableOpacity>
            </View>
            <View style={tw`w-full items-center mt-10`}>
              <TouchableOpacity
                style={tw`bg-black h-[60px] justify-center items-center w-[50] rounded-md`}
              >
                <Text style={tw`text-white font-poppins-medium text-[14px]`}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({});
export default Registration;
