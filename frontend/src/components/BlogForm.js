import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function BlogForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);
    await API.post('/blogs', formData);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Blog</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" required />
      <input type="file" onChange={e => setImage(e.target.files[0])} />
      <button type="submit">Post</button>
    </form>
  );
}
