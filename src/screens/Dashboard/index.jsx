import { useNavigation } from '@react-navigation/native';
import {View, Text, Image, FlatList, TouchableOpacity, StyleSheet} from "react-native"
import tw from '../../../tailwind';
import ScreenNavigation from '../../components/screenNav';

const Dashboard = () => {
  const navigate = useNavigation();

  const data = [
    {
      id: 1,
      title: "Kilani Farm",    
      product_avatar: require("../../../assets/ProductImages/tomatoes.png"),
      product_name: "Tomatoes",
      sack_type:"basket",
      quantity:35,
      seller:" Dan Abeey Farms",
      seller_id:45,
      seller_address: "No 5, Ade Street, Abuja",
      unit_price: 25000,
      seller_avatar: require("../../../assets/user.png"),
      views: 87
    },
    {
      id: 2,
      product_avatar: require("../../../assets/ProductImages/chicken.png"),
      product_name: "Chicken",
      sack_type:"2.5kg/piece",
      quantity:53,
      seller:" Chi Farms",
      seller_id:15,
      seller_address: "No 25, Ivan way, Kogi State",
      unit_price: 15000,
      seller_avatar: require("../../../assets/user.png"),
      views: 30
    },
    {
      id: 3,
      product_avatar: require("../../../assets/ProductImages/egg.png"),
      product_name: "Egg",
      sack_type:"crete",
      quantity:133,
      seller:" Baba Farms",
      seller_id:15,
      seller_address: "Yaya Village, Rivers State",
      unit_price: 5000,
      seller_avatar: require("../../../assets/user.png"),
      views: 12
    }
  ]

  const RenderLatest = ({item}) => {
    return (
      <TouchableOpacity onPress={() => navigate.navigate("ItemDetail", {
        item
      })}>
      <View style={tw`shadow-md bg-white w-full py-[20px] px-[12px] rounded-lg mb-5`}>
        <View>
          <Image source={item?.product_avatar} style={[tw`rounded-xl`,{ height: 150, width: "100%"}]} />
        </View>
        <View style={tw`flex-row justify-between mt-3`}>
          <View style={tw`flex-row items-center`}>
            <View style={tw`mr-3`}>
              <Image source={item?.seller_avatar} style={[{ height: 40, width: 40}, tw`rounded-full`]} />
            </View>
            <View>
              <Text style={tw`font-poppins-regular text-[14px]`}>{item?.seller}</Text>
              <Text style={tw`font-poppins-bold text-[14px] text-color-234`}>NGN {item?.unit_price?.toLocaleString()}</Text>
            </View>
          </View>
          <View style={tw`flex-row items-center`}>
            <View>
            <Image source={require("../../../assets/seen.png")} style={{ height: 20, width: 20}} />
            </View>
            <Text style={tw`font-poppins-semibold text-[14px]`}>{item?.views}</Text>
          </View>
        </View>
      </View>

      </TouchableOpacity>
    )
  }
  return (
    <View style={tw`h-full bg-white`}>
      <ScreenNavigation title="Dashboard" />
      <View style={tw`px-5`}>
        <Text style={tw`font-poppins-thin text-[15px]`}> Hello</Text>
        <Text style={tw`font-poppins-semibold text-[19px] mb-[40px]`}>Babatunde Ashafa</Text>
        <Text style={tw`font-poppins-semibold text-[18px] mb-[32px]`}>Latest Items</Text>
        <View style={styles.container}>
          <FlatList
            data={data}
            renderItem={RenderLatest}
            keyExtractor={({ id}) => id.toString()}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
          
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#fff"
  },
})
export default Dashboard;

