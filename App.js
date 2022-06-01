import React, { createContext, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/navigation/auth';

import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_300Light, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import AppStack from './src/navigation/app';

export const AppContext = createContext();

export default function App() {
  const [auth, setAuth] = useState(false);

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


