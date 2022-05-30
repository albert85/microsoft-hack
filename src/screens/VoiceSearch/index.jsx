import React, { useState } from 'react';
import {View, Text, Image, TouchableOpacity} from "react-native";
import tw from '../../../tailwind';
import ScreenNavigation from '../../components/screenNav';
import {MaterialIcons} from '@expo/vector-icons'
import { Audio } from 'expo-av';

import { AudioConfig, CancellationDetails, CancellationReason, NoMatchDetails, NoMatchReason, ResultReason, SpeechConfig, SpeechRecognizer } from 'microsoft-cognitiveservices-speech-sdk';
import RNFS from 'react-native-fs';
import getPath from '@flyerhq/react-native-android-uri-path'
import { Buffer } from 'buffer';
// const Buffer = require('buffer').Buffer;

const VoiceSearch = () => {
  const [record, setRecord] = useState(false);
  const [uri, setUri] = useState("");
  const [filename, setFilename] = useState("");
  const [recording, setRecording] = useState();
  const [results, setResults] = useState("");
  const [events, setEvents] = useState("");
  const [recognizing, setRecognizing] = useState(false)
  let subscriptionKey = "0b85de29df894f749bac16a41dfbc1a3"
  let region = "germanywestcentral"
  let language = "en-US"
  let reco = null

  const disposeReco = () => {
    reco.close();
    reco = null;
  };

  const endRecognition = () => {
    setRecognizing(false)
    this.setState({ recognizing: false });
    if(reco !== undefined && reco !== null) {
      reco.stopContinuousRecognitionAsync(
        () => disposeReco(),
        (e) => disposeReco()
      );
    }
  };

  const getBufferFromUri = async (uri) => {
    const path = getPath(uri);
    const utf8string = await RNFS.readFile(path, 'base64');
  
    return Buffer.from(utf8string, 'base64');
  }

  const getRecognizer = async (key, region, language, uri, filename) => {
    const fileBuf = await getBufferFromUri(uri);
    const audioConfig = AudioConfig.fromWavFileInput(fileBuf, filename);
  
    const speechConfig = SpeechConfig.fromSubscription(key, region);
  
    speechConfig.speechRecognitionLanguage = language;
    return new SpeechRecognizer(speechConfig, audioConfig);
  };

  const startRecognition = async () => {
    reco = await getRecognizer(subscriptionKey, region, language, uri, filename);
    if(reco) {
      setResults("")
      setEvents("")
      setRecognizing(true)
      reco.recognizing = (s, e) => {
        setResults(e.result.text)
        setEvents("")
        setRecognizing(true)
      };
      reco.canceled = (s, e) => {
        if (e.reason === CancellationReason.Error) {
          setResults("")
          setEvents(e.errorDetails)
        }
      };
      reco.recognized = (s, e) => {
        //window.console.log(e);
  
        // Indicates that recognizable speech was not detected, and that recognition is done.
        let eventText = `(recognized)  Reason: ${ResultReason[e.result.reason]}`;
        if (e.result.reason === ResultReason.NoMatch) {
          setResults("")
          setEvents(NoMatchReason[noMatchDetail.reason])
        } else {
          setResults("")
          setEvents(e.result.text)
        }
      };
      reco.recognizeOnceAsync(
        (result) => {
            let eventText = `(continuation) Reason: ${ResultReason[result.reason]}`;
            switch (result.reason) {
              case ResultReason.RecognizedSpeech:
                setResults(result.text)
                // eventText += ` Text: ${result.text}`;
                break;
              case ResultReason.NoMatch:
                let noMatchDetail = NoMatchDetails.fromResult(result);
                setResults("")
                setEvents(NoMatchReason[noMatchDetail.reason])
                break;
              case ResultReason.Canceled:
                let cancelDetails = CancellationDetails.fromResult(result);
                eventText += ` CancellationReason: ${CancellationReason[cancelDetails.reason]}`;
                if (cancelDetails.reason === CancellationReason.Error) {
                  setResults("")
                  setEvents(cancelDetails.errorDetails)
                }
                break;
              default:
                break;
            }
        },
        (err) => {
          setResults("")
          setEvents(err),
          setRecognizing(false)
        });
      }
      console.log(results, "results")
      console.log(events, "events")
      console.log(recognizing, "recog")
  };

  // adw
  async function startRecording() {
      
    try {
      // setSpeak(true)
      // console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      // console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync(); 
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }
  async function stopRecording() {
    // setLoading(true)
    // console.log(loading, "loading")
    // setSpeak(false)
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    // console.log(recording)
    const urii = recording.getURI(); 
    setUri(urii)
    if 
    (uri !==""){
      startRecognition()
    }
  //  let cleanUri= uri.slice(7);
  //  console.log(cleanUri)
    // bingApi(cleanUri).then(res=>{
    //   // console.log(res, "*********")
    //   if (res.status === 200){
    //     // setLoading(false)
    //     AsyncStorage.getItem("products")
    //     .then(JSON.parse)
    //     .then((data) => {
    //       let filteredData = data.filter((item) => item.product_name.includes('Tomatoes')).map(({id, product_name, quantity, sack_type, seller, unit_price}) => ({id, product_name, quantity, sack_type, seller, unit_price}));
    //       console.log(filteredData);
    //       if (filteredData.length > 0){setProductData(filteredData)}
    //     })
    //     setSearchView(true)
    //     setSearchMessage("Results for "+res.result.DisplayText)
    //   }
    // })
  }
  
  return (<View style={tw`bg-white flex-1`}>
      <ScreenNavigation title='Voice Search' homeNav={false} />
      <View style={tw`h-[86%] items-center justify-center`}>
          <Text style={tw`font-poppins-medium text-6 mb-[25px]`}>{!record  ? "Click to use Voice Search" : "Speak Now!"}</Text>
          <View style={tw`p-[100px] bg-color-5E5`}>
           {!record && ( <TouchableOpacity onPress={()=> {
             setRecord((prev) => !prev) 
             startRecording()
          }}>
               {/* <Image source={require("../../../assets/inactive_speak.png")} /> */}
               <MaterialIcons name="keyboard-voice" size={200} color="black" />
            </TouchableOpacity>)}
            {record && (<TouchableOpacity onPress={()=> {
              setRecord((prev) => !prev)
              stopRecording()
            }}>
              {/* <Image source={require("../../../assets/active_speak.png")} /> */}
              <MaterialIcons name="keyboard-voice" size={200} color="#0DB1AD" />
            </TouchableOpacity>)}

          </View>
      </View>
  </View>)
}

export default VoiceSearch;