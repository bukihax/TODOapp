import { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PRIMARY = '#4F46E5';

export default function TaskListScreen({ username, tasks, onSignOut, onAddTask, onToggleTask, onDeleteTask }) {
  const [hideCompleted, setHideCompleted] = useState(false);

  const filteredTasks = hideCompleted ? tasks.filter((t) => !t.completed) : tasks;

  const renderItem = ({ item }) => (
    <View style={styles.taskCard}>
      <TouchableOpacity
        style={[styles.checkbox, item.completed && styles.checkboxChecked]}
        onPress={() => onToggleTask(item.id)}
        activeOpacity={0.7}
      >
        {item.completed && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
      </TouchableOpacity>

      <View style={styles.taskInfo}>
        <Text style={[styles.taskTitle, item.completed && styles.taskTitleDone]}>
          {item.title}
        </Text>
        <Text style={styles.taskDate}>{item.dueDate}</Text>
      </View>

      <TouchableOpacity onPress={() => onDeleteTask(item.id)} activeOpacity={0.7} hitSlop={8}>
        <Ionicons name="trash-outline" size={20} color="#EF4444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, {username}</Text>
        <TouchableOpacity onPress={onSignOut} activeOpacity={0.7} hitSlop={8}>
          <Ionicons name="exit-outline" size={26} color="#111827" />
        </TouchableOpacity>
      </View>

      {/* Title row */}
      <View style={styles.titleRow}>
        <Text style={styles.sectionTitle}>My Tasks</Text>
        <TouchableOpacity style={styles.addButton} onPress={onAddTask} activeOpacity={0.85}>
          <Ionicons name="add" size={18} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Hide completed filter */}
      <TouchableOpacity
        style={styles.filterRow}
        onPress={() => setHideCompleted(!hideCompleted)}
        activeOpacity={0.7}
      >
        <View style={[styles.filterCheckbox, hideCompleted && styles.filterCheckboxChecked]}>
          {hideCompleted && <Ionicons name="checkmark" size={11} color="#FFFFFF" />}
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
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tasks yet. Tap + Add to get started.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F2F7',
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
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 20,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PRIMARY,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 4,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
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
    borderColor: '#9CA3AF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterCheckboxChecked: {
    backgroundColor: PRIMARY,
    borderColor: PRIMARY,
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
    paddingBottom: 32,
    gap: 12,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: PRIMARY,
    borderColor: PRIMARY,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  taskTitleDone: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
    fontWeight: '400',
  },
  taskDate: {
    fontSize: 13,
    color: '#6B7280',
  },
  emptyText: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 15,
    marginTop: 48,
  },
});
