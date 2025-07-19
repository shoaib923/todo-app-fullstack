// src/components/TaskList.js
import React from 'react';
import { List } from '@mui/material';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <List>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </List>
  );
};

export default TaskList;