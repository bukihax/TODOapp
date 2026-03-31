import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AddTaskScreen({ onBack, onAdd }) {
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleAdd = () => {
    if (!description.trim()) return;
    onAdd(description.trim(), deadline.trim() || 'No deadline');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Task</Text>
        </View>

        <View style={styles.body}>
          {/* Description */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Task Description</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Enter task details..."
              placeholderTextColor="#9CA3AF"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Deadline */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Deadline</Text>
            <View style={styles.dateRow}>
              <TextInput
                style={styles.dateInput}
                placeholder="e.g. Apr 5, 2026"
                placeholderTextColor="#9CA3AF"
                value={deadline}
                onChangeText={setDeadline}
              />
              <Ionicons
                name="calendar-outline"
                size={20}
                color="#6B7280"
                style={styles.calendarIcon}
              />
            </View>
          </View>
        </View>

        {/* Add button */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={handleAdd}>
            <Text style={styles.buttonText}>Add Task</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  body: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 24,
  },
  fieldGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  textArea: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    minHeight: 100,
  },
  dateRow: {
    position: 'relative',
    justifyContent: 'center',
  },
  dateInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingRight: 44,
    fontSize: 16,
    color: '#111827',
  },
  calendarIcon: {
    position: 'absolute',
    right: 14,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 12,
  },
  button: {
    backgroundColor: '#4F46E5',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
