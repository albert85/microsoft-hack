import React, {useState, useEffect} from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import tw from '../../../tailwind';
import Loading from '../../components/Loader';
import ScreenNavigation from '../../components/screenNav';
import useUserDetails from '../../hooks/users';
import { commaSeparator } from '../../util/util';

const chooseIcon = (status) => {
  switch (status) {
    case 'delivered':
      return require('../../../assets/success.png')
    case 'cancelled':
      return require('../../../assets/caution.png')
    case 'intransit':
      return require('../../../assets/warning.png')
  
    default:
      return require('../../../assets/pending.png')
  }
}

const Orders = () => {
  const navigate = useNavigation();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const handleFetchDetails = async () => {
    setLoading(true);
    try {
      const {orders} = await useUserDetails();
      setOrders(orders);
      
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(()=> {
    handleFetchDetails();
  },[useIsFocused()])

  const RenderOrder = ({ item }) => (
  <TouchableOpacity onPress={()=> navigate.navigate("OrderDetail", {
    item
  })}>
      <View
        style={tw`shadow-md bg-color-8F8 px-[26px] py-[12px] rounded-[5px] flex-row items-center mb-5`}
      >
        <View>
          <Image source={chooseIcon(item?.logisticStatus)} />
        </View>
        <View style={tw`ml-4`}>
          <Text style={tw`font-poppins-regular text-[13px]`}>
            {item?.qty} {item?.product?.sack_type} of {item?.product?.product_name} - NGN {commaSeparator(item?.qty * item?.product?.price)}
          </Text>
          <Text style={tw`font-poppins-regular text-[13px]`}>{item?.product.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={tw`flex-1 bg-white`}>
      <ScreenNavigation title="My Orders" remove={false} />
      <Loading loading={loading}>
      <View style={tw`px-5`}>
        <FlatList
        data={orders}
        renderItem={RenderOrder}
        keyExtractor={({ id }) => id.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        />

        {/* <RenderOrder img={require('../../../assets/caution.png')} />
        <RenderOrder img={require('../../../assets/warning.png')} />
        <RenderOrder img={require('../../../assets/success.png')} />
        <RenderOrder img={require('../../../assets/pending.png')} /> */}
      </View>
      </Loading>
    </View>
  );
};

export default Orders;
