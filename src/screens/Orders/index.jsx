import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from '../../../tailwind';
import ScreenNavigation from '../../components/screenNav';

const Orders = () => {
  const navigate = useNavigation();

  const RenderOrder = ({ img = '' }) => (
  <TouchableOpacity onPress={()=> navigate.navigate("OrderDetail")}>
      <View
        style={tw`shadow-md bg-color-8F8 px-[26px] py-[12px] rounded-[5px] flex-row items-center mb-5`}
      >
        <View>
          <Image source={img} />
        </View>
        <View style={tw`ml-4`}>
          <Text style={tw`font-poppins-regular text-[13px]`}>
            7 baskets of Tomatoes - NGN 34,345.90
          </Text>
          <Text style={tw`font-poppins-regular text-[13px]`}>Kilani Farms</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={tw`flex-1 bg-white`}>
      <ScreenNavigation title="My Orders" remove={false} />
      <View style={tw`px-5`}>
        <RenderOrder img={require('../../../assets/caution.png')} />
        <RenderOrder img={require('../../../assets/warning.png')} />
        <RenderOrder img={require('../../../assets/success.png')} />
        <RenderOrder img={require('../../../assets/pending.png')} />
      </View>
    </View>
  );
};

export default Orders;
