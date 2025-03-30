// src/components/TaskList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TaskList = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({ priority: '', status: '' });
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/tasks', {
        params: filter,
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  return (
    <div>
      <h2>Task List</h2>
      <div>
        <label>
          Priority:
          <select onChange={(e) => setFilter({ ...filter, priority: e.target.value })}>
            <option value="">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
        <label>
          Status:
          <select onChange={(e) => setFilter({ ...filter, status: e.target.value })}>
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </label>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <Link to={`/task/${task._id}`}>{task.title}</Link> - {task.priority} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TaskList;
