// src/components/TaskDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const TaskDetail = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({});

  const token = localStorage.getItem('token');

  const fetchTask = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTask(res.data);
      setUpdatedTask(res.data);
    } catch (err) {
      console.error('Error fetching task:', err);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTask(res.data);
      setEditMode(false);
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/');
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  if (!user) {
    return <p className="text-center">Please log in to view task details.</p>;
  }

  if (!task) {
    return <p>Loading...</p>;
  }

  return (
    <div className="card shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
      <div className="card-body">
        <h3 className="card-title">Task Details</h3>
        {editMode ? (
          <>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                value={updatedTask.title}
                onChange={(e) => setUpdatedTask({ ...updatedTask, title: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="3"
                value={updatedTask.description}
                onChange={(e) => setUpdatedTask({ ...updatedTask, description: e.target.value })}
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Due Date</label>
              <input
                type="date"
                className="form-control"
                value={updatedTask.dueDate ? updatedTask.dueDate.split('T')[0] : ''}
                onChange={(e) => setUpdatedTask({ ...updatedTask, dueDate: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Priority</label>
              <select
                className="form-select"
                value={updatedTask.priority}
                onChange={(e) => setUpdatedTask({ ...updatedTask, priority: e.target.value })}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={updatedTask.status}
                onChange={(e) => setUpdatedTask({ ...updatedTask, status: e.target.value })}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="d-flex">
              <button className="btn btn-success me-2" onClick={handleUpdate}>Save</button>
              <button className="btn btn-secondary" onClick={() => setEditMode(false)}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <p><strong>Due Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</p>
            <p><strong>Priority:</strong> {task.priority}</p>
            <p><strong>Status:</strong> {task.status}</p>
            <div className="d-flex">
              <button className="btn btn-primary me-2" onClick={() => setEditMode(true)}>Edit</button>
              <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskDetail;