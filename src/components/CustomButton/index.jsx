import {TouchableOpacity, View, Text} from 'react-native';
import tw from '../../../tailwind';

const CustomButton = ({ title = "", onPress=()=>{}, className="", textClassName=""}) => {
  return (
    <TouchableOpacity onPress={onPress}>
    <View style={tw`bg-black h-[56px] rounded-[8px] items-center justify-center text-[16px] font-poppins-bold ${className}`}>
      <Text style={tw`text-white ${textClassName}`}>{title}</Text>
    </View>
  </TouchableOpacity>
  )
}

export default CustomButton;