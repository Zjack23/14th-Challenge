import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useParams } from 'react-router-dom';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/posts/${id}`)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    axios.post(`${process.env.REACT_APP_API_URL}/api/posts/${id}/comments`, { content: comment })
      .then(response => {
        setPost(response.data);
        setComment('');
      })
      .catch(error => {
        console.error('Error submitting comment:', error);
      });
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>Posted by: {post.username} on {new Date(post.date).toLocaleDateString()}</p>
      <h3>Comments</h3>
      <ul>
        {post.comments.map((comment, index) => (
          <li key={index}>
            <p>{comment.content}</p>
            <p>By: {comment.username} on {new Date(comment.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
      {user && (
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Leave a comment"
            required
          />
          <button type="submit">Submit Comment</button>
        </form>
      )}
    </div>
  );
}

export default PostDetail;
