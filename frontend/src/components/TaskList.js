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

  if (!user) {
    return <p className="text-center">Please log in to view your tasks.</p>;
  }

  return (
    <div>
      <h2 className="mb-4">Your Tasks</h2>
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Priority</label>
          <select className="form-select" onChange={(e) => setFilter({...filter, priority: e.target.value})}>
            <option value="">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Status</label>
          <select className="form-select" onChange={(e) => setFilter({...filter, status: e.target.value})}>
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      <div className="row">
        {tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          tasks.map(task => (
            <div className="col-md-4" key={task._id}>
              <div className="card shadow-sm mb-3">
                <div className="card-body">
                  <h5 className="card-title">{task.title}</h5>
                  <p className="card-text"><strong>Priority:</strong> {task.priority}</p>
                  <p className="card-text"><strong>Status:</strong> {task.status}</p>
                  <Link to={`/task/${task._id}`} className="btn btn-primary btn-sm">View Details</Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
