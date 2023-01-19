import { StyleSheet, View, Button, Image, TouchableOpacity, Text } from 'react-native'
import { useEffect, useState } from 'react'
import * as LocalAuthentication from 'expo-local-authentication'
import { Alert } from 'react-native'
import  Logo from '../assets/Swifty.png'

export default function Biometric({navigation}) {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false)

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  }, []);

  const handleBiometricAuth = async () => {
    try {
      const savedBiometrics = await LocalAuthentication.isEnrolledAsync()
      if (savedBiometrics)
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
          Alert.alert('Error', 'No biometrics saved')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
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