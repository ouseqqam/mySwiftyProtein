import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { Alert } from 'react-native';

export default function App() {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

// Check if hardware supports biometrics
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  }, []);

  const handleBiometricAuth = async () => {
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync()
      if (savedBiometrics)
      {
          const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Authenticate',
            cancelLabel: 'Cancel',
            disableDeviceFallback: true,
          })
          if (result.success) {
            Alert.alert('Success', 'Authenticated successfully');
          }
          else {
            Alert.alert('Error', 'Authentication failed');
          }
      }
      else
          Alert.alert('Error', 'No biometrics saved', () => fallBackToDefaultAuth())
  }

  const [enteredGoal, setEnteredGoal] = useState('');
  const [goals, setGoals] = useState([]);
  const goalInputHandler = enteredText => {
    setEnteredGoal(enteredText);
  }

  const addGoalHandler = () => {
    setGoals(currentGoals => [
      ...currentGoals,
      enteredGoal
    ]);
  }

  return (
    // <View style={styles.container}>
    //   <View style={styles.inputContainer} >
    //     <TextInput 
    //       style={styles.input}
    //       placeholder="your course goals" 
    //       onChangeText={goalInputHandler}  ></TextInput>
    //     <Button title="Add goal" onPress={ addGoalHandler } />
    //   </View>
    //   <View style={styles.goalsContainer} >
    //     {/* <ScrollView>
    //       {
    //         goals.map((goal) => {
    //           return <Text style={styles.goalsItem} key={goal}>{goal}</Text>
    //         })
    //       }
    //     </ScrollView> */}
    //     <FlatList
    //       data={goals}
    //       renderItem={itemData => (
    //         <View>
    //           <Text style={styles.goalsItem}>{itemData.item}</Text>
    //         </View>
    //       )}
    //     />
    //   </View>
    // </View>
    <View style={styles.container}>
      <Text>Is biometric supported: {isBiometricSupported ? 'Yes' : 'No'}</Text>
      <Button title="Authenticate" onPress={handleBiometricAuth} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingButtom: 24,
    marginBottom:10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '70%',
    marginRight: 10,
    padding: 10,
    height: 40,
    borderRadius: 10,
  },
  goalsContainer: {
    flex: 5,
  },
  goalsItem: {
    padding: 10,
    backgroundColor: '#5e0acc',
    borderColor: '#ccc',
    color: 'white',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
  }
});