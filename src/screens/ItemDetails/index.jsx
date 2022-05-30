import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import tw from '../../../tailwind';
import Icon from "@expo/vector-icons/FontAwesome5"
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/inputText';
import ScreenNavigation from '../../components/screenNav';
import { useNavigation } from '@react-navigation/native';

const ItemDetails = (props) => {
  const navigate = useNavigation();
  let detail = props.route.params.item
  console.log(props.route.params.item)
  return (
    <ScrollView contentContainerStyle={tw`bg-white pb-6`}>
      <ScreenNavigation title='Item Details' homeNav={false} />
      <View style={tw`px-5`}>
      <Text style={tw`font-poppins-semibold text-[18px] mb-[32px]`}>{detail?.seller}</Text>
      <Image source={detail?.product_avatar} style={[{ height: 250, width: "100%"}, tw`rounded-xl`]} />
      <View style={tw`mt-4`}>
      <Text style={tw`font-poppins-bold text-4`}>{detail?.product_name}</Text>
      <Text style={tw`font-poppins-regular text-3 mb-3`}>{detail?.quantity} {detail?.sack_type} available</Text>
      <View style={tw`flex-row justify-between h-[56px] w-full`}>
        <TouchableOpacity>
          <View style={tw`items-center justify-center rounded-lg bg-black w-[56px] h-[56px]`}>
            <Text style={tw`text-white text-[18px] font-poppins-bold`}>-</Text>
          </View>
        </TouchableOpacity>
        <View style={tw`items-center justify-center h-full bg-color-5E5 w-[59%] rounded-lg`}>
          <Text style={tw`font-poppins-bold text-[14px]`}>1</Text>
        </View>
        <TouchableOpacity>
          <View style={tw`items-center justify-center rounded-lg bg-black w-[56px] h-[56px]`}>
            <Text style={tw`text-white text-[18px] font-poppins-bold`}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
      <SelectDropdown
      data={['Karma Logistics', 'Tagi Logistics']}
      buttonStyle={tw`mt-4 w-full h-[60px] bg-color-5E5 rounded-[8px]`}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index)
      }}
      defaultButtonText="Select Preffered Logistics Company"
      buttonTextStyle={tw`text-[14px]`}
      renderDropdownIcon={()=> (<Icon name="chevron-down" size={20} />)}
      />
      <CustomInput placeholder="Enter Destination Address" className="border-0 bg-color-5E5 h-[66px] mt-[16px]" />
      <CustomButton onPress={()=> navigate.navigate("Payment", {
        item: props?.route?.params?.item
      })} title="Buy Now" className='mt-[60px]' />
      </View>
      </View>

    </ScrollView>
  )
}

export default ItemDetails;