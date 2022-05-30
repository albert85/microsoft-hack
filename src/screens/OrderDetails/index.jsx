import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import tw from '../../../tailwind';
import CustomButton from '../../components/CustomButton';
import CustomHeaderText from '../../components/CustomTitle';
import ScreenNavigation from '../../components/screenNav';

const OrderDetails = () => {
  return (
    <View style={tw`flex-1 bg-white`}>
      <ScrollView>
        <ScreenNavigation title="My Orders" homeNav={false} />
        <View style={tw`px-5`}>
          <CustomHeaderText title="Order Details (Kilani Farms)" />
          <View>
            <Image
              source={require('../../../assets/big_tom.png')}
              style={[tw`rounded-lg`, { height: 250, width: '100%' }]}
            />
            <View style={tw`mt-[12px]`}>
              <View style={tw`flex-row`}>
                <Text style={tw`font-poppins-bold`}>
                  Number of Bags/Baskets:{' '}
                </Text>
                <Text style={tw`font-poppins-regular`}>7</Text>
              </View>
              <View style={tw`flex-row`}>
                <Text style={tw`font-poppins-bold`}>Amount </Text>
                <Text style={tw`font-poppins-regular`}>NGN 32,500.00</Text>
              </View>
              <View style={tw`flex-row`}>
                <Text style={tw`font-poppins-bold`}>To: </Text>
                <Text style={tw`font-poppins-regular`}>
                  No 5, Adelage Cresent, Koton kafe Kogi State, Nigeria
                </Text>
              </View>
              <View style={tw`flex-row`}>
                <Text style={tw`font-poppins-bold`}>Date of Purchase: </Text>
                <Text style={tw`font-poppins-regular`}>12/03/2022</Text>
              </View>

              <Text style={tw`my-10`}>
                I confirm that I have recieved my Purchases{' '}
              </Text>
              <CustomButton title='Items yet to be dispatched' className='bg-color-2C9rgba mb-4' textClassName='text-color-2C9' />
              <CustomButton title='Cancel and Refund' className='bg-color-5E5 mb-4' textClassName='text-black' />
              <CustomButton title='I confirm that I have recieved my Purchases' className='bg-trans-C8E mb-4' textClassName='text-black' />
              <CustomButton title='Delivered' className='bg-trans-1AD mb-4' textClassName='text-black' />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderDetails;
