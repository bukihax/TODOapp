import React, { useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import TaskListScreen from './screens/TaskListScreen';
import AddTaskScreen from './screens/AddTaskScreen';

const defaultTasks = [
  { id: '1', title: 'Review project proposal', dueDate: 'Apr 2, 2026', completed: false },
  { id: '2', title: 'Buy groceries', dueDate: 'Apr 1, 2026', completed: true },
];

export default function App() {
  const [screen, setScreen] = useState('login');
  const [username, setUsername] = useState('');
  const [tasks, setTasks] = useState(defaultTasks);

  const handleLogin = (name) => {
    setUsername(name);
    setScreen('tasks');
  };

  const handleSignOut = () => {
    setScreen('login');
  };

  const handleAddTask = (title, dueDate) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      dueDate,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
    setScreen('tasks');
  };

  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  if (screen === 'login') {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (screen === 'addTask') {
    return (
      <AddTaskScreen
        onBack={() => setScreen('tasks')}
        onAdd={handleAddTask}
      />
    );
  }

  return (
    <TaskListScreen
      username={username}
      tasks={tasks}
      onSignOut={handleSignOut}
      onAddTask={() => setScreen('addTask')}
      onToggleTask={handleToggleTask}
      onDeleteTask={handleDeleteTask}
    />
  );
}
