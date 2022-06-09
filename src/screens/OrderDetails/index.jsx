import { serverTimestamp } from 'firebase/firestore';
import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { firestoreStore } from '../../../firebase.config';
import tw from '../../../tailwind';
import CustomButton from '../../components/CustomButton';
import CustomHeaderText from '../../components/CustomTitle';
import ScreenNavigation from '../../components/screenNav';
import { useNavigation } from '@react-navigation/native';
import { commaSeparator } from '../../util/util';

const OrderDetails = (props) => {
  const navigate = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const firestoreInstance = firestoreStore.getFirestore();
  let detail = props.route.params.item;

  const handleRefund = async (status) => {
    setLoading(true);
    try {
      const orderRef = firestoreStore.doc(firestoreInstance, "orders/", detail?.id);
      await firestoreStore.updateDoc(orderRef, {
        logisticStatus: status
      }).then(() => {
        setLoading(false);
        navigate.navigate("OrdersList");
      });
    } catch (error) {
      setLoading(false);
      console.log(error)
    }

  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <ScrollView>
        <ScreenNavigation title="My Orders" homeNav={false} />
        <View style={tw`px-5`}>
          <CustomHeaderText title={`Order Details (${detail?.product?.title})`} />
          <View>
            <Image
              source={{uri: detail?.product?.product_avatar}}
              style={[tw`rounded-lg`, { height: 250, width: '100%' }]}
            />
            <View style={tw`mt-[12px]`}>
              <View>
              <View style={tw`flex-row`}>
                <Text style={tw`font-poppins-bold`}>
                  Number of Bags/Baskets:{' '}
                </Text>
                <Text style={tw`font-poppins-regular`}>{detail?.qty}</Text>
              </View>
              <View style={tw`flex-row`}>
                <Text style={tw`font-poppins-bold`}>Amount </Text>
                <Text style={tw`font-poppins-regular`}>NGN {commaSeparator(detail?.qty * detail?.product?.price)}</Text>
              </View>
              <View style={tw`flex-row`}>
                <Text style={tw`font-poppins-bold`}>To: </Text>
                <Text style={tw`font-poppins-regular`}>
                  {detail?.destination}
                </Text>
              </View>
              <View style={tw`flex-row`}>
                <Text style={tw`font-poppins-bold`}>Date of Purchase: </Text>
                <Text style={tw`font-poppins-regular`}>{ new Date(1000 * detail?.createdAt?.seconds).toDateString()}</Text>
              </View>
              </View>

              <View style={tw`mt-10`}>
              {detail?.logisticStatus === "intransit" && (<Text style={tw`my-10`}>
                I confirm that I have recieved my Purchases{' '}
              </Text>)}
              {detail?.logisticStatus === "pending" && (<CustomButton title='Items yet to be dispatched' className='bg-white mb-4' textClassName='text-color-2C9' />)}
              {detail?.logisticStatus === "pending" && (<CustomButton loading={loading} onPress={() => handleRefund("cancelled")} title='Cancel and Refund' className='bg-color-5E5 mb-4' textClassName='text-black' />)}
              {detail?.logisticStatus === "intransit" && (<CustomButton loading={loading} onPress={() => handleRefund("delivered")} title='Confirm' className='bg-trans-C8E mb-4' textClassName='text-black' />)}
              {detail?.logisticStatus === "delivered" && (<CustomButton title='Delivered' className='bg-white mb-4' textClassName='text-color-AC4' />)}
              </View>

            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderDetails;
