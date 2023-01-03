import { View, Text, StyleSheet, TouchableOpacity  } from 'react-native' 


export default function LigandItem(props) {
    return (
        <View style= {styles.container} >
            <TouchableOpacity onPress={() => props.navigation.navigate('liganDetails')}>
                <Text styles = {styles.text}>{props.ligand}</Text>
            </TouchableOpacity> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#d0d0ff',
        marginTop: 20,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    }
  })


//   <TouchableWithoutFeedback onPress={() => console.log(props.ligand)}>
//     Keyboard.dismiss()
//     </TouchableWithoutFeedback>