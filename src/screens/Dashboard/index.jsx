import React, {useState, useEffect} from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import {View, Text, Image, FlatList, TouchableNativeFeedback, StyleSheet} from "react-native"
import tw from '../../../tailwind';
import ScreenNavigation from '../../components/screenNav';
import useUserDetails from '../../hooks/users';
import Loading from '../../components/Loader';
import { commaSeparator } from '../../util/util';

const Dashboard = () => {
  const navigate = useNavigation();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const handleFetchDetails = async () => {
    setLoading(true);
    try {
      const {user, products: newProducts} = await useUserDetails();
      setUser(user);
      setProducts(newProducts);
      
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(()=> {
    handleFetchDetails();
  },[useIsFocused()])

  const RenderLatest = ({item}) => {
    return (
      <TouchableNativeFeedback onPress={() => navigate.navigate("ItemDetail", {item})}>
      <View style={styles.card}>
        <View>
          <Image source={{ uri: item?.product_avatar}} style={[tw`rounded-xl`,{ height: 150, width: "100%"}]} />
          <View style={styles.imageLowerContainer}>
            <Text style={styles.imageFirstText}>{item?.product_name}</Text>
            <Text style={styles.imageSecondText}>{item?.quantity} {item?.sack_type} available</Text>
          </View>
        </View>
        <View style={tw`flex-row justify-between mt-3`}>
          <View style={tw`flex-row items-center`}>
            <View style={tw`mr-3`}>
              <Image source={{ uri: item?.seller_avatar}} style={[{ height: 40, width: 40}, tw`rounded-full`]} />
            </View>
            <View>
              <Text style={tw`font-poppins-regular text-[14px]`}>{item?.seller}</Text>
              <Text style={tw`font-poppins-bold text-[14px] text-color-234`}>NGN {commaSeparator(item?.price)}</Text>
            </View>
          </View>
          <View style={tw`flex-row items-center`}>
            <View>
            <Image source={require("../../../assets/seen.png")} style={{ height: 20, width: 20}} />
            </View>
            <Text style={tw`font-poppins-semibold text-[14px]`}>{commaSeparator(item?.views)}</Text>
          </View>
        </View>
      </View>

      </TouchableNativeFeedback>
    )
  }
  return (
    <View style={tw`h-full bg-white`}>
      <ScreenNavigation title="Dashboard" />
      <Loading loading={loading}>
        <View style={tw`px-5`}>
          <Text style={tw`font-poppins-thin text-[15px]`}>Hello Again,</Text>
          <Text style={styles.nameText}>{`${user?.firstName} ${user?.lastName}`}</Text> 
          <Text style={tw`font-poppins-medium text-[18px] mt-[20px]`}>Latest Items</Text>
          <View style={styles.container}>
            <FlatList
              data={products}
              renderItem={RenderLatest}
              keyExtractor={({ id}) => id.toString()}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
            
          </View>
        </View>
      </Loading>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#fff",
    height: "75%"
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
  },
  card:{
    backgroundColor: "#fff",
    borderRadius: 13,
    borderWidth:0.5,
    borderColor:"#f1f1f1",
    borderTopColor:"#fff",
    borderBottomWidth:1,
    marginTop:5,
    marginBottom:5,
    padding:15,
  },
  nameText:{
    fontSize:15,
    color:"#000",
    fontFamily:"Poppins_500Medium",
    marginTop:-5,
  },
})
export default Dashboard;

