import { StyleSheet, View, TextInput } from 'react-native'
import LigandsList from './components/ligandsList'



export default function App() {
  return (
    <View style={styles.container}>
      <LigandsList />
    </View>
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