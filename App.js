import { StyleSheet, View, TextInput } from 'react-native'
import LigandsList from './components/ligandsList'
import Navigator from './routes/homeStack';



export default function App() {
  return (
      <Navigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
})