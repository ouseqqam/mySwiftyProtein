import { StyleSheet, View, Button, Image, TouchableOpacity, Text } from 'react-native'
import { useEffect, useState, useCallback } from 'react'
import * as LocalAuthentication from 'expo-local-authentication'
import { Alert } from 'react-native'
import  Logo from '../assets/Swifty.png'
import * as SplashScreen from 'expo-splash-screen';
import LigandsList from './ligandsList'

SplashScreen.preventAutoHideAsync()

export default function Biometric({navigation}) {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false)
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    function prepare() {
      try {
        setAppIsReady(true);
      } catch (e) {
        console.console(e);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync()
      const savedBiometrics = await LocalAuthentication.isEnrolledAsync()
      if (compatible && savedBiometrics)
        setIsBiometricSupported(compatible)
      else
        navigation.navigate('LigandList')
    })();
  }, []);

  const handleBiometricAuth = async () => {
    try {
      if (isBiometricSupported)
      {
          const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Authenticate',
          })
          if (result.success) {
            navigation.navigate('LigandList')
          }
          else {
            Alert.alert('Error', 'Authentication failed');
          }
      }
      else
        navigation.navigate('LigandList')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Image source= {Logo} style = {styles.img} />
      {
        isBiometricSupported ?
        <TouchableOpacity style= {styles.btn} onPress= { handleBiometricAuth } >
          <Text style = {styles.txt} >Authenticate</Text>
        </TouchableOpacity>
        :
          null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 300,
    height: 300
  },
  btn: {
    backgroundColor: '#19c2ea',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 40,
    // borderWidth: 1,
    borderColor: '#1A0000',
    borderRadius: 20
  }, 
  txt: {
    color: '#1A0000',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white'
  }
});