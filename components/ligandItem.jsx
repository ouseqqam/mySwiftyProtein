import { View, Text, StyleSheet, TouchableOpacity  } from 'react-native' 


export default function LigandItem(props) {
    return (
        <View style= {styles.container} >
            <TouchableOpacity onPress={() => props.navigation.navigate('liganDetails')}>
                <Text>{props.ligand}</Text>
            </TouchableOpacity> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 15,
        // borderRadius: 10,
        backgroundColor: '#d0d0ff',
    },
  })


//   <TouchableWithoutFeedback onPress={() => console.log(props.ligand)}>
//     Keyboard.dismiss()
//     </TouchableWithoutFeedback>