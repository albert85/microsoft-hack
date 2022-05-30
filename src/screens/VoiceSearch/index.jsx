import React, { useState } from 'react';
import {View, Text, Image, TouchableOpacity} from "react-native";
import tw from '../../../tailwind';
import ScreenNavigation from '../../components/screenNav';
import {MaterialIcons} from '@expo/vector-icons'

const VoiceSearch = () => {
  const [record, setRecord] = useState(false);

  return (<View style={tw`bg-white flex-1`}>
      <ScreenNavigation title='Voice Search' homeNav={false} />
      <View style={tw`h-[86%] items-center justify-center`}>
          <Text style={tw`font-poppins-medium text-6 mb-[25px]`}>{!record  ? "Click to use Voice Search" : "Speak Now!"}</Text>
          <View style={tw`p-[100px] bg-color-5E5`}>
           {!record && ( <TouchableOpacity onPress={()=> setRecord((prev) => !prev)}>
               {/* <Image source={require("../../../assets/inactive_speak.png")} /> */}
               <MaterialIcons name="keyboard-voice" size={200} color="black" />
            </TouchableOpacity>)}
            {record && (<TouchableOpacity onPress={()=> setRecord((prev) => !prev)}>
              {/* <Image source={require("../../../assets/active_speak.png")} /> */}
              <MaterialIcons name="keyboard-voice" size={200} color="#0DB1AD" />
            </TouchableOpacity>)}

          </View>
      </View>
  </View>)
}

export default VoiceSearch;