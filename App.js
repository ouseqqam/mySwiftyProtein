import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState('');
  const [goals, setGoals] = useState([]);
  const goalInputHandler = enteredText => {
    setEnteredGoal(enteredText);
  }

  const addGoalHandler = () => {
    setGoals(currentGoals => [
      ...currentGoals,
      enteredGoal
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer} >
        <TextInput 
          style={styles.input}
          placeholder="your course goals" 
          onChangeText={goalInputHandler}  ></TextInput>
        <Button title="Add goal" onPress={ addGoalHandler } />
      </View>
      <View style={styles.goalsContainer} >
        {/* <ScrollView>
          {
            goals.map((goal) => {
              return <Text style={styles.goalsItem} key={goal}>{goal}</Text>
            })
          }
        </ScrollView> */}
        <FlatList
          data={goals}
          renderItem={itemData => (
            <View>
              <Text style={styles.goalsItem}>{itemData.item}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingButtom: 24,
    marginBottom:10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '70%',
    marginRight: 10,
    padding: 10,
    height: 40,
    borderRadius: 10,
  },
  goalsContainer: {
    flex: 5,
  },
  goalsItem: {
    padding: 10,
    backgroundColor: '#5e0acc',
    borderColor: '#ccc',
    color: 'white',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
  }
});