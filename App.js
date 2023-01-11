import { StyleSheet, View, TextInput } from 'react-native'
import Biometric from './components/biometric'
import Data from './components/data'
import Protein from './components/protein'
import Navigator from './routes/homeStack'



export default function App() {
  return (
   <Navigator />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
})