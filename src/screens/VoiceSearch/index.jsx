import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet, Text, View, TouchableOpacity, ActivityIndicator,Image,FlatList, Platform,
} from 'react-native'
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import tw from '../../../tailwind';
import ScreenNavigation from '../../components/screenNav';
import {MaterialIcons} from '@expo/vector-icons'
import axios from 'axios'
import { data } from '../../../assets/Data';


const styles = StyleSheet.create({
  searchContainer: {
    padding:"5%",
  },
  searchHeaderContainer:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between"
  },
  searchHeaderText:{
    fontSize:17,
    fontFamily:"Poppins_500Medium",
  },
  noContainer:{
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignContent:"center",
    alignItems:"center",
    height:400,
  },
  noText:{
    fontSize:14,
    fontFamily:"Poppins_400Regular",
    width:"70%",
    textAlign:"center",
    marginTop:20
  }
})
const recordingOptions = {
  android: {
    extension: '.m4a',
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000,
  },
  ios: {
    extension: '.wav',
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
}
const VoiceSearch = () => {
  const navigate = useNavigation();
  const [isRecording, setIsrecording] = useState(false);
  const [isFetching, setIsfetching] = useState(false);
  const[noResult, setNoResult]= useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [recording, setRecording] = useState(false);
  const [productData, setProductData] = useState([])
  const [initialProductData, setInitialProductData] = useState([])
  const [searchView, setSearchView] = useState(false)
  let searchText
  useEffect(() => {  
    setInitialProductData(data)
    },
    []);

  const getTranscription2 = async () => {
    try {
      const { uri } = await FileSystem.getInfoAsync(recording.getURI())
      const formData = new FormData()
      formData.append('audiofile', {
        uri,
        type: Platform.OS === 'ios' ? 'audio/x-wav' : 'audio/m4a',
        name: Platform.OS === 'ios' ? `${Date.now()}.wav` :`${Date.now()}.m4a`,
      })
      const response = await fetch('https://quidroo-be.herokuapp.com/bingapi', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: formData
      });
      const json = await response.json();
      console.log(json.result)
      return json.result;
    } catch (error) {
      console.error(error);
    }
  };

  const getTranscription = async () => {
    setIsfetching(true)
    try {
      const { uri } = await FileSystem.getInfoAsync(recording.getURI())
      const formData = new FormData()
      formData.append('audiofile', {
        uri,
        type: Platform.OS === 'ios' ? 'audio/x-wav' : 'audio/m4a',
        name: Platform.OS === 'ios' ? `${Date.now()}.wav` :`${Date.now()}.m4a`,
      })
      const { data } = await axios.post('http://127.0.0.1:8000/bingapi', formData, {
      // const { data } = await axios.post('https://quidroo-be.herokuapp.com/bingapi', formData, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          // "Accept":"application/json, text/plain, /",
          // "Content-Type": "multipart/form-data"
          // "Content-Type":  "application/x-www-form-urlencoded", 
          "Accept": "application/json"
        },
      })
      console.log(data.result)
      if (data.result.RecognitionStatus === "Success"){
        setSearchView(true)
        setSearchWord(data.result.DisplayText)
        console.log(searchWord, "*********")
        let x = data.result.DisplayText
        searchText = x.replace('.','')
        
        let filteredData = initialProductData.filter((item) => item.product_name.includes(searchText)).map(({id, product_name, quantity, sack_type, seller, unit_price, product_avatar, seller_avatar, views}) => ({id, product_name, quantity, sack_type, seller, unit_price, product_avatar, seller_avatar, views}));
        console.log(filteredData, "filtered data");
        if (filteredData.length > 0){
          setProductData(filteredData)
          console.log(filteredData)
        }
        else{
          setNoResult(true)
        }
      }
      else{
        console.log("no result")
      }
      
    } catch (error) {
      // console.log('There was an error reading file', error)
      // console.log(error.response.data, "detail error")
      if (error.response) {
        // Request made and server responded
        // console.log(error.response.data);
        console.log(error.response.status);
        console.log('Error', error.message);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }
    setIsfetching(false)
  }

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Starting recording..');

      const recording = new Audio.Recording();
      
      await recording.prepareToRecordAsync(recordingOptions)
      await recording.startAsync()
      setRecording(recording);
      // console.log('Recording started');
      // console.log(recording, "recording")
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setIsrecording(false)
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    getTranscription()
  }
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
      <View style={tw`bg-white flex-1`}>
        <ScreenNavigation title='Voice Search' homeNav={false} />
        {searchView ?
          <View style={styles.searchContainer}>
            <View style={styles.searchHeaderContainer}>
              <Text style={styles.searchHeaderText}> Search Results for {searchWord}</Text>
              <TouchableOpacity onPress={()=>{setSearchView(false); setProductData([]); setNoResult(false)}}>
                <MaterialIcons name="close" size={30} color="#F93972" />
              </TouchableOpacity>
            </View>
            {noResult && 
              <View style={styles.noContainer}>
                <MaterialIcons name="error" size={100} color="#F93972" />
                <Text style={styles.noText}>Oops! Sorry no result for {searchWord} Try again</Text>
              </View>
            }
            <FlatList
                data={Object.values(productData)}
                // keyExtractor={(item, index) => `${index}-${item.title}`}
                renderItem={RenderLatest} 
              />
          </View>
          :
          <View style={tw`h-[86%] items-center justify-center`}>
              <Text style={tw`font-poppins-medium text-6 mb-[25px]`}>{!recording  ? "Click to use Voice Search" : "Speak Now!"}</Text>
              <View style={tw`p-[100px] bg-color-5E5`}>
              {!recording && ( <TouchableOpacity onPress={()=>{
                  setRecording((prev) => !prev)
                  startRecording()
              }}>
                  <MaterialIcons name="keyboard-voice" size={200} color="black" />
                </TouchableOpacity>)}
                {recording && (<TouchableOpacity onPress={()=> {
                  setRecording((prev) => !prev)
                  stopRecording()
                }}>
                  <MaterialIcons name="keyboard-voice" size={200} color="#0DB1AD" />
                </TouchableOpacity>)}

              </View>
          </View>  
        }
    </View>
    )
}
export default VoiceSearch;