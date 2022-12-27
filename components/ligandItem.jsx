import { View, Text, StyleSheet } from 'react-native' 

export default function LigandItem(props) {
    return (
        <View style= {styles.container} >
            <Text>{props.ligand}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#d0d0ff',
    },
  })