import React, { useState } from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import tw from '../../../tailwind';
import Icon from "@expo/vector-icons/FontAwesome5"
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/inputText';
import ScreenNavigation from '../../components/screenNav';
import { useNavigation } from '@react-navigation/native';

const ItemDetails = (props) => {
  const [qty, setQty] = useState(0)
  const [logistics, setLogistics] = useState('')
  const [destination, setDestination] = useState('')

  const navigate = useNavigation();
  let detail = props.route.params.item

  const handleIncrement = () => {
    const newQty = qty + 1;
    const checkQty = Math.min(newQty,detail?.quantity);
    setQty(checkQty);
  }

  const handleDecrement = () => {
    const newQty = qty - 1;
    const checkQty = Math.max(newQty,0);
    setQty(checkQty);
  }


  return (
    <ScrollView contentContainerStyle={tw`bg-white pb-6`}>
      <ScreenNavigation title='Item Details' homeNav={false} />
      <KeyboardAvoidingView behavior="padding">
        <View style={tw`px-5`}>
        <Text style={tw`font-poppins-semibold text-[18px] mb-[32px]`}>{detail?.seller}</Text>
        <Image source={{ uri: detail?.product_avatar}} style={[{ height: 250, width: "100%"}, tw`rounded-xl`]} />
        <View style={tw`mt-4`}>
        <Text style={tw`font-poppins-bold text-4`}>{detail?.product_name}</Text>
        <Text style={tw`font-poppins-regular text-3 mb-3`}>{detail?.quantity} {detail?.sack_type} available</Text>
        <View style={tw`flex-row justify-between h-[56px] w-full`}>
          <TouchableOpacity onPress={handleDecrement}>
            <View style={tw`items-center justify-center rounded-lg bg-black w-[56px] h-[56px]`}>
              <Text style={tw`text-white text-[18px] font-poppins-bold`}>-</Text>
            </View>
          </TouchableOpacity>
          <View style={tw`items-center justify-center h-full bg-color-5E5 w-[59%] rounded-lg`}>
            <Text style={tw`font-poppins-bold text-[14px]`}>{qty}</Text>
          </View>
          <TouchableOpacity onPress={handleIncrement}>
            <View style={tw`items-center justify-center rounded-lg bg-black w-[56px] h-[56px]`}>
              <Text style={tw`text-white text-[18px] font-poppins-bold`}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
        <SelectDropdown
        data={['Karma Logistics', 'Tagi Logistics']}
        buttonStyle={tw`mt-4 w-full h-[60px] bg-color-5E5 rounded-[8px]`}
        onSelect={(selectedItem, index) => {
          setLogistics(selectedItem)
        }}
        defaultButtonText="Select Preffered Logistics Company"
        buttonTextStyle={tw`text-[14px]`}
        renderDropdownIcon={()=> (<Icon name="chevron-down" size={20} />)}
        />
        <CustomInput onChangeText={(text) => setDestination(text)} placeholder="Enter Destination Address" className="border-0 bg-color-5E5 h-[66px] mt-[16px]" />
        <CustomButton onPress={()=> navigate.navigate("Payment", {
          item: props?.route?.params?.item,
          selectedItems: {
            logistics,
            qty,
            destination
          }
        })} title="Buy Now" className='mt-[60px]' />
        </View>
        </View>
      </KeyboardAvoidingView>

    </ScrollView>
  )
}

export default ItemDetails;