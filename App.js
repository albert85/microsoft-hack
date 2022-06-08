import React, { createContext, useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/navigation/auth';

import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_300Light, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import AppStack from './src/navigation/app';
import { firebaseAuth, app as firestoreAuth, } from './firebase.config';

export const AppContext = createContext();

export default function App() {
  const [auth, setAuth] = useState(false);
  // const [farmProduct, setFarmProduct] = useState([]);
  // const [orders, setOrders] = useState([]);
  // const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(()=> firebaseAuth.onAuthStateChanged(firestoreAuth, user => {
      if (user != null) {
        setAuth(true)
        console.log('We are authenticated now!');
        // isAuth = true;
      } else {
        setAuth(false)
      }
    })
  ,[auth])

  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_600SemiBold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  if (loading) {
    return <AppLoading />;
  }

  return (
    <AppContext.Provider value={{auth, setAuth}}>
    <NavigationContainer>
      {
        !auth ? <AuthStack /> : <AppStack />
      }
    </NavigationContainer>
    </AppContext.Provider>
  );
}


