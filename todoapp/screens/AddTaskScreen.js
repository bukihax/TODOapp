import { useState } from 'react';
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

const PRIMARY = '#4F46E5';

export default function AddTaskScreen({ onBack, onAdd }) {
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleAdd = () => {
    if (!description.trim()) return;
    onAdd(description.trim(), deadline.trim());
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} activeOpacity={0.7} hitSlop={8}>
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
                placeholder="mm/dd/yyyy"
                placeholderTextColor="#9CA3AF"
                value={deadline}
                onChangeText={setDeadline}
                keyboardType="numeric"
                returnKeyType="done"
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

        {/* Footer button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.button, !description.trim() && styles.buttonDisabled]}
            onPress={handleAdd}
            activeOpacity={0.85}
          >
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
    backgroundColor: '#F2F2F7',
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  body: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 28,
    gap: 24,
  },
  fieldGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  textArea: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
    minHeight: 110,
  },
  dateRow: {
    position: 'relative',
    justifyContent: 'center',
  },
  dateInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingRight: 48,
    fontSize: 16,
    color: '#111827',
  },
  calendarIcon: {
    position: 'absolute',
    right: 16,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 36,
    paddingTop: 12,
  },
  button: {
    backgroundColor: PRIMARY,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
