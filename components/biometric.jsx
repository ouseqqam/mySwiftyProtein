import { StyleSheet, View, Button } from 'react-native'
import { useEffect, useState } from 'react'
import * as LocalAuthentication from 'expo-local-authentication'
import { Alert } from 'react-native'

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
      {
        isBiometricSupported ?
          <Button title="Authenticate" onPress={handleBiometricAuth} />
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
});