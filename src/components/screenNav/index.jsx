import {View, Text, Image, TouchableOpacity} from 'react-native';
import tw from '../../../tailwind';
import Icon from "@expo/vector-icons/FontAwesome5"
import { useNavigation } from '@react-navigation/native';

const ScreenNavigation = ({ title = "", homeNav = true, remove = true }) => {
  const navigate = useNavigation();
  return (
    <View style={tw`py-10 pt-12 pl-5 pb-5 flex-row justify-between items-center bg-white w-full mb-[26px] shadow-lg`}>
      {remove && (<TouchableOpacity onPress={()=> {
        if(homeNav){
        }else {
          navigate.goBack();
        }
      }}>
        {!homeNav && (<Icon name="arrow-left" size={25} />)}
        {homeNav && (<Image source={require("../../../assets/logout.png")} style={{ height: 25, width: 25}} />)}
      </TouchableOpacity>)}
      {
        !remove && <View />
      }
    <Text style={tw`font-poppins-bold text-[20px]`}>{title}</Text>
    <View />
  </View>
  )
}

export default ScreenNavigation;