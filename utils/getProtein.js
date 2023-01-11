import { useEffect, useState } from 'react'
import axios from 'axios'
import parsePdb from 'parse-pdb'

const getProtein = async () => {
    try {
      //get data
      const res = await axios.get(`https://files.rcsb.org/ligands/view/${ligand}_ideal.pdb`)

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

export default getProtein