import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Snackbar, Alert } from '@mui/material';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const API_URL = '/api'; // Proxy path for Apps Script Web App

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [error, setError] = useState(null);

  // Fetch tasks
  useEffect(() => {
    axios.get(API_URL)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setTasks(response.data);
        } else {
          setError('Unexpected data format from server.');
        }
      })
      .catch(() => {
        setError('Failed to fetch tasks. Please try again.');
      });
  }, []);

  // Add new task
  const addTask = (task) => {
    axios.post(API_URL, task)
      .then((response) => {
        const { id } = response.data;
        setTasks([...tasks, { ...task, id, status: 'Pending' }]);
      })
      .catch(() => {
        setError('Failed to add task. Please try again.');
      });
  };

  // Update task (uses _method override)
  const updateTask = (task) => {
    axios.post(API_URL, { ...task, _method: 'PUT' })
      .then(() => {
        setTasks(tasks.map(t => (t.id === task.id ? task : t)));
        setTaskToEdit(null);
      })
      .catch(() => {
        setError('Failed to update task. Please try again.');
      });
  };

  // Delete task (uses _method override)
  const deleteTask = (id) => {
    axios.post(API_URL, { id, _method: 'DELETE' })
      .then(() => {
        setTasks(tasks.filter(t => t.id !== id));
      })
      .catch(() => {
        setError('Failed to delete task. Please try again.');
      });
  };

  // Snackbar close handler
  const handleClose = () => {
    setError(null);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        To-Do App
      </Typography>

      <TaskForm
        addTask={addTask}
        updateTask={updateTask}
        taskToEdit={taskToEdit}
      />

      <TaskList
        tasks={tasks}
        onEdit={setTaskToEdit}
        onDelete={deleteTask}
      />

      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default App;
