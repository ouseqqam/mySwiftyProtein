import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LigandsList from '../components/ligandsList'
import LigandDetails from '../components/ligandDetails'

const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LigandList" component={LigandsList}  />
        <Stack.Screen name="liganDetails" component={LigandDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}