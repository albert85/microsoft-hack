import React from 'react'
// import { useNavigation } from '@react-navigation/native';
import { Text,StyleSheet, View, Image,TouchableOpacity} from 'react-native'
import tw from '../../../tailwind';

// import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'

const ProductCard = ({ item, index }) => {
//  function ProductCard({ item, index }) {
  // const navigate = useNavigation();
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
  );
}
const styles = StyleSheet.create({
    imageContainer:{
        width:"100%",
        height:150,
        backgroundColor:"#ff0",
        padding:20,
        display:"flex",
        flexDirection:"column-reverse",
        justifyContent:"flex-start",
        borderRadius:20,
  
      },
      imageMajorText:{
        fontFamily:"Poppins_Medium",
        fontSize:20,
  
      },
      imageMinorText:{
        fontFamily:"Poppins_Light",
        fontSize:14,  
      },
      lowerContainer:{
        display:"flex",
        flexDirection:"row",
        // backgroundColor:"#0f0",
        justifyContent:"space-between",
        // padding:15,
        alignItems:"center"
      },
      lowerContainerInner:{
        display:"flex",
        flexDirection:"row",
        // backgroundColor:"#0f0",
        alignItems:"center"
      },
      lowerTextUp:{
        fontFamily:"Poppins_Light",
        fontSize:17, 
      },
      lowerTextDown:{
        fontFamily:"Poppins_Medium",
        fontSize:17, 
        color:"#0B8234"
      },
      overall:{
        backgroundColor: "#FFFFFF",
        // boxShadow: "50px 90px 166px -32px rgba(98, 0, 133, 0.07)",
        shadowOffset: {
            width: 1,
            height: 1
          },
        shadowOpacity: 0.5,
        shadowRadius:1,
        borderRadius: 13,
        shadowColor: "black",
        marginTop:10,
        marginBottom:5,
        padding:15,
      },
      eyeText:{
        fontFamily:"Poppins_Medium",
        fontSize:17, 
        marginLeft:15
      }
   
  });

export default ProductCard
