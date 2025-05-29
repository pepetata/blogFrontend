import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import { Logged, Login, Logout } from "./components/LoginForm";
import Blog from "./components/Blog";
import Button from "./components/Button";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const noErrorMessage = { type: "", message: "" };
  const [errorMessage, setErrorMessage] = useState(noErrorMessage);
  const [user, setUser] = useState(null);
  const [showBlogForm, setShowBlogForm] = useState(false);

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }

    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  console.log(`=== user`, user);
  console.log(`=== blogs`, blogs);

  const updateBlog = (updatedBlog) => {
    setBlogs((blogs) =>
      blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    );
  };

  const removeBlog = (deletedBlog) => {
    setBlogs((blogs) => blogs.filter((blog) => blog.id !== deletedBlog.id));
  };

  return (
    <div>
      <h2>Blogs Application</h2>
      <Notification type={errorMessage.type} message={errorMessage.message} />

      {!user ? (
        <Login setUser={setUser} setErrorMessage={setErrorMessage} />
      ) : (
        <div>
          <Logged
            user={user}
            setUser={setUser}
            setShowBlogForm={setShowBlogForm}
          />

          {!showBlogForm && (
            <>
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
            </>
          )}

          {showBlogForm && (
            <BlogForm
              setBlogs={setBlogs}
              blogs={blogs}
              setErrorMessage={setErrorMessage}
              toggleVisibility={() => setShowBlogForm(false)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
