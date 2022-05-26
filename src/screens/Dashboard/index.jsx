import { useNavigation } from '@react-navigation/native';
import {View, Text, Image, FlatList, TouchableOpacity} from "react-native"
import tw from '../../../tailwind';
import ScreenNavigation from '../../components/screenNav';

const Dashboard = () => {
  const navigate = useNavigation();

  const data = [
    {
      id: "1",
      title: "Kilani Farm",
      price: 12333
    },
    {
      id: "2",
      title: "Ashafa Farm",
      price: 94444
    },
    {
      id: "3",
      title: "Lamidi Farm",
      price: 14453
    },
  ]

  const RenderLatest = ({item}) => {
    return (
      <TouchableOpacity onPress={() => navigate.navigate("ItemDetail", {
        item
      })}>
      <View style={tw`shadow-md bg-white w-full py-[20px] px-[12px] rounded-lg mb-5`}>
        <View>
          <Image source={require("../../../assets/tomatoes.png")} style={[tw`rounded-xl`,{ height: 150, width: "100%"}]} />
        </View>
        <View style={tw`flex-row justify-between mt-3`}>
          <View style={tw`flex-row items-center`}>
            <View style={tw`mr-3`}>
              <Image source={require("../../../assets/user.png")} style={[{ height: 40, width: 40}, tw`rounded-full`]} />
            </View>
            <View>
              <Text style={tw`font-poppins-regular text-[14px]`}>{item?.title}</Text>
              <Text style={tw`font-poppins-bold text-[14px] text-color-234`}>NGN {item?.price?.toLocaleString()}</Text>
            </View>
          </View>
          <View style={tw`flex-row items-center`}>
            <View>
            <Image source={require("../../../assets/seen.png")} style={{ height: 20, width: 20}} />
            </View>
            <Text style={tw`font-poppins-semibold text-[14px]`}>90</Text>
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
      <View style={{ height: "70%" }}>
        <FlatList
          data={data}
          renderItem={RenderLatest}
          keyExtractor={({ id}) => id.toString()}
        />
      </View>
      </View>
    </View>
  )
}

export default Dashboard;

