import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/posts`)
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  const handleDelete = (postId) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/posts/${postId}`)
      .then(() => {
        setPosts(posts.filter(post => post._id !== postId));
      })
      .catch(error => {
        console.error('Error deleting post:', error);
      });
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <Link to="/create-post">Create New Post</Link>
      <ul>
        {posts.filter(post => post.username === user.username).map(post => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <Link to={`/edit-post/${post._id}`}>Edit</Link>
            <button onClick={() => handleDelete(post._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
