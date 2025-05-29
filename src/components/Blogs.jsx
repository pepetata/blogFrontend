import React from 'react';
import Blog from './Blog';
import Togglable from './Togglable';
import Button from './Button';
import blogService from '../services/blogs';        
import '../css/Blogs.css';
import Notification from './Notification';
import Login from './Login';

const Blogs = ({ blogs, setBlogs, setErrorMessage, updateBlog, removeBlog, user }) => {
  return (
    <div>
              <Button onClick={() => setShowBlogForm(true)} text="New Blog" />
              <h2>Blogs</h2>
              {blogs
                .slice() // make a shallow copy to avoid mutating state
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                  <Blog
                    key={blog.id}
                    blog={blog}
                    setErrorMessage={setErrorMessage}
                    updateBlog={updateBlog}
                    removeBlog={removeBlog}
                    userId={user.id}
                  />
                ))}
    </div>
  );
}


export default Blogs;