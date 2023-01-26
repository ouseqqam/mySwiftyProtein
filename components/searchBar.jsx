import { View, TextInput, StyleSheet, Button, Text, TouchableOpacity } from "react-native"
import { useState } from "react"
import { FontAwesome } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'

export default function SearchBar(props) {
    const [search, setSearch] = useState(false)
    return (
        <View style = {styles.container} >
            {
                search ?
                    <View style={styles.cancel} >
                    <TouchableOpacity onPress={() => setSearch(!search)}>
                        <AntDesign name="arrowleft" size={24} color="#1A0000" />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        placeholder="Search..."
                        onChangeText={props.handleChange}
                    />
                    </View>
                :
                    <View style = {styles.search} >
                        <Text style = {styles.text} >Ligand list</Text>
                        <TouchableOpacity onPress={() => setSearch(!search)}>
                            <FontAwesome name="search" size={24} color="#1A0000" />
                        </TouchableOpacity>
                    </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 2,
        borderColor: '#1A0000',
        border: 'solid',
        width : '90%',
        padding: 10,
        borderRadius: 20,
        color: '#1A0000'
    },
    search: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 20,  
    },
    cancel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        // color: '#19c2ea'
    },
    btn: {
        
    }
})