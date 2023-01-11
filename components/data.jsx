import { StyleSheet, View, TextInput, Text } from 'react-native'
import { useEffect, useState } from 'react'
import axios from 'axios'
import parsePdb from 'parse-pdb'

export default function Data() {
  const [atom, setAtom] = useState()
  const [connect, setConnect] = useState()

  const getProtein = async () => {
    try {

      //get data
      const res = await axios.get('https://files.rcsb.org/ligands/view/011_ideal.pdb')

      //set atom
      const data = parsePdb(res.data).atoms
      setAtom(data)

      //set connect
      let data1 = res.data
      data1 = data1.split('\n')
      let connects = data1.filter((line) => line.includes('CONECT'))
      for (let i = 0; i < connects.length; i++) {
        connects[i] = connects[i].split(' ')
        connects[i] = connects[i].filter((item) => item !== 'CONECT')
        connects[i] = connects[i].filter((item) => item !== '')
      }
      setConnect(connects)
      console.log(atom[0])
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getProtein()
  }, [])
  return (
    <View style={styles.container}>
      {
        atom && atom.map((item, index) => {
          return (
            <Text key={index}>{item.name} {item.x} {item.y} {item.z} {item.element} </Text>
          )
        }
        )
      }
    </View>
  )
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