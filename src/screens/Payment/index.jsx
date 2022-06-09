import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text } from 'react-native';
import { app, firestoreStore } from '../../../firebase.config';
import tw from '../../../tailwind';
import CustomButton from '../../components/CustomButton';
import CustomHeaderText from '../../components/CustomTitle';
import ScreenNavigation from '../../components/screenNav';
import { serverTimestamp } from 'firebase/firestore';
import { commaSeparator } from '../../util/util';

const Payment = (props) => {
  const navigate = useNavigation();
  const firestoreInstance = firestoreStore.getFirestore();

  const [loading, setLoading] = useState(false)
  const data = props.route.params;

  const handlePaymentComplete = async () => {
    setLoading(true);
    try {
      const newProductQty = data?.item?.quantity - data?.selectedItems.qty;
  
      const orderDetails = {
        "qty": data?.selectedItems.qty,
        "productId": data?.item?.id,
        "status": 'payment completed',
        "logisticStatus": "pending",
        "userId": app.currentUser.uid,
        "destination": data?.selectedItems.destination,
        "createdAt": serverTimestamp()
      }
  
      const productRef = firestoreStore.doc(firestoreInstance, "products/", data?.item?.id)
      const orderRef = firestoreStore.collection(firestoreInstance, "orders");
      await firestoreStore.addDoc(orderRef, orderDetails);
      
      firestoreStore.updateDoc(productRef, {
        "quantity": newProductQty
      }).then((res) => {
        setLoading(false);
        navigate.navigate("Home");
      }).catch((err) => {
        console.log(err)
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={tw`pb-5 bg-white h-full`}>
      <ScreenNavigation title="Confirmation/Payment" homeNav={false} />
      <View style={tw`px-5 justify-between flex-col`}>
        <View>
          <CustomHeaderText title={props?.route?.params?.item?.title} />
            <View style={tw`flex-row bg-color-items shadow-md rounded-[13px]`}>
              <View style={[tw`relative w-[116px]`]}>
                <Image
                  source={{uri: data?.item?.product_avatar}}
                  style={[tw`w-[116px] flex-1 rounded-[13px]`]}
                />
              </View>
              <View style={tw`ml-2 pt-3`}>
                <Text>{data.selectedItems.qty} {data?.item?.sack_type} of {data?.item?.product_name}</Text>
                <View style={tw`flex-row my-2 items-center`}>
                  <Text style={tw`mr-1 font-poppins-bold`}>Amount</Text>
                  <Text style={tw`font-poppins-regular`}>NGN {`${commaSeparator(data.item.price * data.selectedItems.qty)}`}</Text>
                </View>
                <View style={tw`flex-row`}>
                  <Text style={tw`font-poppins-bold`}>To:</Text>
                  <Text style={tw`ml-1 font-poppins-regular w-[66%]`}>
                    {data.selectedItems.destination}
                  </Text>
                </View>
              </View>
            </View>
        </View>
        <CustomButton disabled={loading} onPress={handlePaymentComplete} title={loading ? "Loading": "Complete Payment Now"} className="mt-[100%]" />
      </View>
    </View>
  );
};

export default Payment;
