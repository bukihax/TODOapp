import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Text,
} from 'react-native';
import { CheckBox, Input, Button } from '@rneui/themed';

const defaultTasks = [
  { id: '1', title: 'Buy groceries', complete: false },
  { id: '2', title: 'Walk the dog', complete: false },
  { id: '3', title: 'Do laundry', complete: true },
  { id: '4', title: 'Read a book', complete: false },
  { id: '5', title: 'Call the dentist', complete: false },
];

export default function App() {
  const [tasks, setTasks] = useState(defaultTasks);
  const [inputText, setInputText] = useState('');

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, complete: !task.complete } : task
      )
    );
  };

  const addTask = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;
    const newTask = {
      id: Date.now().toString(),
      title: trimmed,
      complete: false,
    };
    setTasks((prev) => [...prev, newTask]);
    setInputText('');
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskRow}>
      <CheckBox
        checked={item.complete}
        onPress={() => toggleComplete(item.id)}
        containerStyle={styles.checkbox}
      />
      <Text style={[styles.taskText, item.complete && styles.taskDone]}>
        {item.title}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>TaskFlow</Text>

        <View style={styles.inputRow}>
          <Input
            placeholder="Add a new task..."
            value={inputText}
            onChangeText={setInputText}
            containerStyle={styles.inputContainer}
            onSubmitEditing={addTask}
          />
          <Button title="Add" onPress={addTask} buttonStyle={styles.addButton} />
        </View>

        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputContainer: {
    flex: 1,
  },
  addButton: {
    backgroundColor: '#4a90e2',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 40,
  },
  list: {
    flex: 1,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    paddingRight: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  taskText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    flexWrap: 'wrap',
  },
  taskDone: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
});
