import {View, Text, ScrollView} from "react-native";
import tw from '../../../tailwind';
import CustomInput from '../../components/inputText';
import ScreenNavigation from '../../components/screenNav';

const Account = () => {
  return (
    <View style={tw`flex-1 bg-white`}>
    <ScrollView contentContainerStyle={tw`bg-white`}>
      <ScreenNavigation title='Account' homeNav={false} remove={false} />
      <View style={tw`px-5`}>
        <CustomInput placeholder="Babatunde Ashafa" editable={false} className="border-0 bg-color-5E5 h-[66px] mb-0" />
        <CustomInput placeholder="0804499494" editable={false} className="border-0 bg-color-5E5 h-[66px] mb-0 mt-5" />
        <CustomInput placeholder="Babatunde Ashafa" editable={false} className="border-0 bg-color-5E5 h-[66px] mb-0 mt-5" />
        <Text style={tw`mt-[48px] font-poppins-medium text-[14px]`}>Latest Transaction</Text>
        <View style={tw`shadow-sm w-full bg-white p-6 mb-4`}>
          <View>
            <Text style={tw`font-poppins-thin text-[10px]`}>Purchase of Tomatoes - Kilani farms</Text>
            <View style={tw`flex-row justify-between mt-4`}>
              <Text style={tw`text-color-0A0 text-[10px]`}>04 Jan 2001</Text>
              <Text style={tw`text-color-C8B text-[12px]`}>NGN255,000.00</Text>
            </View>
            <View style={tw`w-full border-2 border-color-5E5 mt-3`} />
          </View>
        </View>
      </View>
    </ScrollView>
    </View>
  )
}

export default Account;
