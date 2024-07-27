import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PostDetail from './components/PostDetail';
import CreatePost from './components/CreatePost';
import UpdatePost from './components/UpdatePost';
import { AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute'; // Create a PrivateRoute component if needed

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route
              path="/dashboard"
              element={<PrivateRoute component={<Dashboard />} />}
            />
            <Route
              path="/create-post"
              element={<PrivateRoute component={<CreatePost />} />}
            />
            <Route
              path="/edit-post/:id"
              element={<PrivateRoute component={<UpdatePost />} />}
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
