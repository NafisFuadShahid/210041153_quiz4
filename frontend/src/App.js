// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';
import AddTask from './components/AddTask';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <NavBar user={user} onLogout={handleLogout} />
      <div className="container mt-5 pt-3">
        <Routes>
          <Route path="/" element={<TaskList user={user} />} />
          <Route path="/task/:id" element={<TaskDetail user={user} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-task" element={<AddTask user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
