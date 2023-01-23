import { StyleSheet, View, TextInput } from 'react-native'
import Protein from './components/protein'
import Navigator from './routes/homeStack'
import LigandsList from './components/ligandsList'



export default function App() {
  return (
   <Navigator />
  )
}