import { View, FlatList, Text, StyleSheet } from "react-native"
import {ligands} from "../data/ligands.js"
import LigandItem from "./ligandItem.jsx";

export default function LigandsList() {
    return (
        <View style= {styles.container} >
            <Text>Ligands List</Text>
            <FlatList
                data={ligands}
                renderItem={({item}) => <LigandItem ligand = {item} />}
                keyExtractor={item => item}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
    },
  })