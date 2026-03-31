import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TaskListScreen({ username, tasks, onSignOut, onAddTask, onToggleTask, onDeleteTask }) {
  const [hideCompleted, setHideCompleted] = useState(false);

  const filteredTasks = hideCompleted
    ? tasks.filter((t) => !t.completed)
    : tasks;

  const renderItem = ({ item }) => (
    <View style={styles.taskCard}>
      <TouchableOpacity
        style={[styles.checkbox, item.completed && styles.checkboxChecked]}
        onPress={() => onToggleTask(item.id)}
      >
        {item.completed && (
          <Ionicons name="checkmark" size={14} color="#FFFFFF" />
        )}
      </TouchableOpacity>

      <View style={styles.taskInfo}>
        <Text style={[styles.taskTitle, item.completed && styles.taskTitleDone]}>
          {item.title}
        </Text>
        <Text style={[styles.taskDate, item.completed && styles.taskDateDone]}>
          {item.dueDate}
        </Text>
      </View>

      <TouchableOpacity onPress={() => onDeleteTask(item.id)}>
        <Ionicons name="trash-outline" size={20} color="#EF4444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {username}</Text>
        </View>
        <TouchableOpacity onPress={onSignOut}>
          <Ionicons name="log-out-outline" size={26} color="#111827" />
        </TouchableOpacity>
      </View>

      {/* Title row */}
      <View style={styles.titleRow}>
        <Text style={styles.sectionTitle}>My Tasks</Text>
        <TouchableOpacity style={styles.addButton} onPress={onAddTask}>
          <Ionicons name="add" size={16} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Filter */}
      <TouchableOpacity
        style={styles.filterRow}
        onPress={() => setHideCompleted(!hideCompleted)}
      >
        <View style={[styles.filterCheckbox, hideCompleted && styles.filterCheckboxChecked]}>
          {hideCompleted && <Ionicons name="checkmark" size={12} color="#FFFFFF" />}
        </View>
        <Text style={styles.filterLabel}>Hide completed</Text>
      </TouchableOpacity>

      {/* Task list */}
      <FlatList
        data={filteredTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        style={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 8,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4F46E5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 4,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
    gap: 8,
  },
  filterCheckbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterCheckboxChecked: {
    backgroundColor: '#4F46E5',
  },
  filterLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4F46E5',
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  taskTitleDone: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  taskDate: {
    fontSize: 13,
    color: '#6B7280',
  },
  taskDateDone: {
    color: '#9CA3AF',
  },
});
