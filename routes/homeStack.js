import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LigandsList from '../components/ligandsList'
import LigandDetails from '../components/ligandDetails'
import Biometric from '../components/biometric'

const Stack = createNativeStackNavigator()



export default function Navigator() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Biometric" component={Biometric} options={{headerShown: false}} />
        <Stack.Screen name="LigandList" component={LigandsList} options={{headerShown: false}} />
        <Stack.Screen name="liganDetails" component={LigandDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


