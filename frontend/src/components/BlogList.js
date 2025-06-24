import React, { useEffect, useState } from 'react';
import API from '../api';

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    API.get('/blogs').then(res => setBlogs(res.data));
  }, []);

  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog => (
        <div key={blog._id}>
          <h3>{blog.title}</h3>
          {blog.image && <img src={`http://localhost:5000/uploads/${blog.image}`} alt="" width={200} />}
          <p>{blog.content}</p>
          <small>By {blog.author.username}</small>
        </div>
      ))}
    </div>
  );
}
