import { View, TextInput, StyleSheet, Button, Text } from "react-native"
import { useState } from "react"

export default function SearchBar(props) {
    const [search, setSearch] = useState(false)
    return (
        <View>
            {
                search ?
                    <View style={styles.cancel} >
                    <Button title="Cancel" onPress={() => setSearch(!search)} />
                    <TextInput
                        style={styles.input}
                        placeholder="Search..."
                        onChangeText={props.handleChange}
                    />
                    </View>
                :
                    <View style = {styles.search} >
                        <Text>Ligand list</Text>
                        <Button title="Search" onPress={() => setSearch(!search)} />
                    </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        // borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    search: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
    },
    cancel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
    }
})