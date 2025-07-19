// src/components/TaskItem.js
import React from 'react';
import { ListItem, ListItemText, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskItem = ({ task, onEdit, onDelete }) => {
  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton onClick={() => onEdit(task)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(task.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      }
    >
      <ListItemText
        primary={task.title}
        secondary={`${task.description} | Due: ${task.dueDate} | Status: ${task.status}`}
      />
    </ListItem>
  );
};

export default TaskItem;