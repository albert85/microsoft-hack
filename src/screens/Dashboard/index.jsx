import { useNavigation } from '@react-navigation/native';
import {View, Text, Image, FlatList, TouchableOpacity, StyleSheet} from "react-native"
import tw from '../../../tailwind';
import ScreenNavigation from '../../components/screenNav';
// import ProductCard from '../../components/ProductCard';
import { data } from '../../../assets/Data';
const Dashboard = () => {
  const navigate = useNavigation();

  const RenderLatest = ({item}) => {
    return (
      <TouchableOpacity onPress={() => navigate.navigate("ItemDetail", {
        item
      })}>
      <View style={tw`shadow-md bg-white w-full py-[20px] px-[12px] rounded-lg mb-5`}>
        <View>
          <Image source={item?.product_avatar} style={[tw`rounded-xl`,{ height: 150, width: "100%"}]} />
          <View style={styles.imageLowerContainer}>
            <Text style={styles.imageFirstText}>{item?.product_name}</Text>
            <Text style={styles.imageSecondText}>{item?.quantity} {item?.sack_type} available</Text>
          </View>
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
    backgroundColor:"#fff",
    height: "70%"
  },
  imageLowerContainer:{
    backgroundColor:"#000",
    marginTop:-70,
    margin:"5%",
    padding:5,
    borderRadius:5,
  }, 
  imageFirstText:{
    fontSize:17,
    color:"#fff",
    fontFamily:"Poppins_700Bold",
  },
  imageSecondText:{
    fontSize:12,
    color:"#fff",
    fontFamily:"Poppins_400Regular",
  }
})
export default Dashboard;

