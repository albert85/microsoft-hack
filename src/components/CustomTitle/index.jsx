import {Text} from 'react-native';
import tw from '../../../tailwind';

const CustomHeaderText = ({ title = ""}) => {
  return (<Text style={tw`font-poppins-semibold text-[18px] mb-[32px]`}>{title}</Text>)
}

export default CustomHeaderText;