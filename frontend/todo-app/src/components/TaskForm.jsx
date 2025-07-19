// src/components/TaskForm.js
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const TaskForm = ({ addTask, updateTask, taskToEdit }) => {
  const [task, setTask] = useState(taskToEdit || { title: '', description: '', dueDate: '' });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskToEdit) {
      updateTask({ ...task, id: taskToEdit.id });
    } else {
      addTask(task);
    }
    setTask({ title: '', description: '', dueDate: '' });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <TextField
        label="Title"
        name="title"
        value={task.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Description"
        name="description"
        value={task.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Due Date"
        name="dueDate"
        type="date"
        value={task.dueDate}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <Button type="submit" variant="contained" color="primary">
        {taskToEdit ? 'Update Task' : 'Add Task'}
      </Button>
    </Box>
  );
};

export default TaskForm;