import { TouchableOpacity, View, Text, StyleSheet } from "react-native"

const Settings = (props) => {
    const {cube, jmol, changeForm, changeColor, captureAndShareScreenshot} = props
    return (
        <View style= {styles.settings}>
          {
            cube ? 
              <TouchableOpacity 
                style= {styles.geometry}
                onPress = {changeForm}
              >
                <Text style= {styles.txt}>
                  Sphere
                </Text>
              </TouchableOpacity>
            :
              <TouchableOpacity 
                style= {styles.geometry}
                onPress = {changeForm}
              >
                <Text style= {styles.txt} >
                  Cube
                </Text>
              </TouchableOpacity>
          }
          {
            jmol ? 
              <TouchableOpacity
                style= {styles.geometry}
                onPress = {changeColor}
              >
                <Text style= {styles.txt}>
                  Rasmol
                </Text>
              </TouchableOpacity>
            :
              <TouchableOpacity
                style= {styles.geometry}
                onPress = {changeColor}
              >
                <Text style= {styles.txt}>
                  Jmol
                </Text>
              </TouchableOpacity>
          }
          <TouchableOpacity
            style= {styles.geometry}
            onPress = {captureAndShareScreenshot}
          >
            <Text style= {styles.txt}>
              Share
            </Text>
          </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    settings: {
      marginTop: 15, 
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: 'black'
    }, 
    geometry: {
      borderWidth: 1,
      borderRadius: 20,
      borderColor: '#19c2ea',
      paddingHorizontal: 20,
      paddingVertical: 5
    },
    txt: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold'
    }
})
  
export default Settings