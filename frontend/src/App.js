import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [user, setUser] = useState(localStorage.getItem('username') || '');

  const logout = () => {
    localStorage.clear();
    setUser('');
  };

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Blogs</Link>
        {user ? (
          <>
            <Link to="/create">Create Blog</Link>
            <span>Welcome, {user}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/create" element={<BlogForm />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
