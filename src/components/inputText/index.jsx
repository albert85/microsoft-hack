import {TextInput} from 'react-native';
import tw from '../../../tailwind';

const CustomInput = (props) => {
  return (<TextInput style={[tw`w-full h-14 border-2 border-input-border rounded-md mt-10 pl-4 font-poppins-regular text-[14px] ${props.className}`]} {...props} />)
}

export default CustomInput;