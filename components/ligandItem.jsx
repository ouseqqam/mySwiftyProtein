import { View, Text, StyleSheet, TouchableOpacity  } from 'react-native' 


export default function LigandItem(props) {
    return (
        <View style= {styles.container} >
            <TouchableOpacity onPress={() => props.navigation.navigate('liganDetails', {
                ligand: props.ligand
            })}>
                <Text style = {styles.text}>{props.ligand}</Text>
            </TouchableOpacity> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 30,
        backgroundColor: '#19c2ea',
        padding: 10,
        borderColor: '#1A0000',
        // borderWidth: 1,
        borderRadius: 10,
        // backgroundColor: '#d0d0ff',
        marginTop: 20,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        // color: 'white',
        textAlign: 'center'
    }
  })


//   <TouchableWithoutFeedback onPress={() => console.log(props.ligand)}>
//     Keyboard.dismiss()
//     </TouchableWithoutFeedback>