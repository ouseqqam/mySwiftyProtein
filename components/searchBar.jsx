import { View, TextInput, StyleSheet, Button, Text } from "react-native"
import { useState } from "react"

export default function SearchBar(props) {
    const [search, setSearch] = useState(false)
    return (
        <View>
            <Button title="Search" onPress={() => setSearch(!search)} />
            {
                    search ?
                    <TextInput
                        style={styles.input}
                        placeholder="Search"
                        onChangeText={props.handleChange}
                    />
                    : 
                    <Text>Ligand list</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
})