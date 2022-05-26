import { View, Image, Text } from 'react-native';
import tw from '../../../tailwind';
import CustomButton from '../../components/CustomButton';
import CustomHeaderText from '../../components/CustomTitle';
import ScreenNavigation from '../../components/screenNav';

const Payment = (props) => {
  return (
    <View style={tw`pb-5 bg-white h-full`}>
      <ScreenNavigation title="Confirmation/Payment" homeNav={false} />
      <View style={tw`px-5 justify-between flex-col`}>
        <View>
          <CustomHeaderText title={props?.route?.params?.item?.title} />
            <View style={tw`flex-row bg-color-items shadow-md rounded-[13px]`}>
              <View style={[tw`relative w-[116px]`]}>
                <Image
                  source={require('../../../assets/big_tom.png')}
                  style={[tw`w-[116px] flex-1 rounded-[13px]`]}
                />
              </View>
              <View style={tw`ml-2 pt-3`}>
                <Text>7 Baskets of Tomatoes</Text>
                <View style={tw`flex-row my-2 items-center`}>
                  <Text style={tw`mr-1 font-poppins-bold`}>Amount</Text>
                  <Text style={tw`font-poppins-regular`}>NGN 3,000.00</Text>
                </View>
                <View style={tw`flex-row`}>
                  <Text style={tw`font-poppins-bold`}>To:</Text>
                  <Text style={tw`ml-1 font-poppins-regular w-[66%]`}>
                    No 5, Adelage Cresent, Koton kafe Kogi State, Nigeria
                  </Text>
                </View>
              </View>
            </View>
        </View>
        <CustomButton title="Complete Payment Now" className="mt-[100%]" />
      </View>
    </View>
  );
};

export default Payment;
