import React, { useState, useEffect} from 'react';
import {View, Text, ScrollView} from "react-native";
import tw from '../../../tailwind';
import CustomInput from '../../components/inputText';
import ScreenNavigation from '../../components/screenNav';
import useUserDetails from '../../hooks/users';
import { useIsFocused } from '@react-navigation/native';
import { FlatList } from 'react-native';
import Loading from '../../components/Loader';

const Account = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const handleFetchDetails = async () => {
    setLoading(true);
    try {
      const {user, ordersTran} = await useUserDetails();
      setUser(user);
      setOrders(ordersTran)
      
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(()=> {
    handleFetchDetails();
  },[useIsFocused()])

  const RenderTransaction = ({item}) => {
    return (
      <View>
      <Text style={tw`font-poppins-thin text-[10px]`}>Purchase of {item?.product?.product_name} - {item?.product?.title}</Text>

      <View style={tw`flex-row justify-between mt-4`}>
        <Text style={tw`text-color-0A0 text-[10px]`}>{ new Date(1000 * item?.createdAt?.seconds).toDateString()}</Text>
        <Text style={tw`text-color-C8B text-[12px]`}>NGN {item?.qty * item?.product?.price}</Text>
      </View>
      <View style={tw`w-full border-2 border-color-5E5 mt-3`} />
    </View>
    )
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <ScreenNavigation title='Account' homeNav={false} remove={false} />
      <Loading loading={loading}>
        <View style={tw`px-5`}>
          <CustomInput placeholder={`${user?.firstName} ${user?.lastName}`}editable={false} className="border-0 bg-color-5E5 h-[66px] mb-0" />
          <CustomInput placeholder={user?.phone} editable={false} className="border-0 bg-color-5E5 h-[66px] mb-0 mt-5" />
          {/* <CustomInput placeholder="Address..." editable={false} className="border-0 bg-color-5E5 h-[66px] mb-0 mt-5" /> */}
          <Text style={tw`mt-[48px] font-poppins-medium text-[14px]`}>Latest Transaction</Text>
          <View style={tw`shadow-sm w-full bg-white p-6 mb-4 h-[70%]`}>
          {orders.length > 0 && (<FlatList
            data={orders}
            renderItem={RenderTransaction}
            keyExtractor={({ id}) => id.toString()}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />)}

          {
            orders.length === 0 && <View>
              <Text>No Transaction available</Text>
            </View>
          }
          </View>
        </View>
      </Loading>
    </View>
  )
}

export default Account;
