import { StyleSheet, View, TextInput } from 'react-native'
import { useEffect, useState } from 'react'
import axios from 'axios'


export default function App() {

  const [atom, setAtom] = useState()
  const [connect, setConnect] = useState()

  const getProtein = async () => {
    const res = await axios.get('https://files.rcsb.org/ligands/view/011_ideal.pdb')
    let data = res.data
    data = data.split('\n')

    let atoms = data.filter((line) => line.includes('ATOM'))
    for (let i = 0; i < atoms.length; i++) {
      atoms[i] = atoms[i].split(' ')
      atoms[i] = atoms[i].filter((item) => item !== 'ATOM')
      atoms[i] = atoms[i].filter((item) => item !== '')
    }
    setAtom(atoms)
    let connects = data.filter((line) => line.includes('CONECT'))
    for (let i = 0; i < connects.length; i++) {
      connects[i] = connects[i].split(' ')
      connects[i] = connects[i].filter((item) => item !== 'CONECT')
      connects[i] = connects[i].filter((item) => item !== '')
    }
    setConnect(connects)
  }
  useEffect(() => {
    getProtein()
  }, [])
  return (
    <View style={styles.container}>
      <TextInput>Swifty protein</TextInput>
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
});