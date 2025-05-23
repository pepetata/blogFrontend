import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import { Login, Logout } from "./components/Login";
import Blog from "./components/Blog";
import Button from "./components/Button";
import Notification from "./components/Notification";
import AddBlog from "./components/AddBlog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const noErrorMessage = { type: "", message: "" };
  const [errorMessage, setErrorMessage] = useState(noErrorMessage);
  const [user, setUser] = useState(null);
  const [newBlog, setNewBlog] = useState(null);

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

  const AddBlogButton = () => {
    return <Button onClick={() => setNewBlog(true)} text="New Blog" />;
  };

  return (
    <div>
      <h2>Blogs</h2>
      <Notification type={errorMessage.type} message={errorMessage.message} />

      {user === null ? (
        <Login setUser={setUser} setErrorMessage={setErrorMessage} />
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <Logout setUser={setUser} setNewBlog={setNewBlog} />
            {newBlog ? null : <AddBlogButton />}
          </div>
          <br />
          <br />
          <div style={{ display: newBlog ? "block" : "none" }}>
            <AddBlog
              setNewBlog={setNewBlog}
              setBlogs={setBlogs}
              blogs={blogs}
              setErrorMessage={setErrorMessage}
            />
          </div>
          {!newBlog && blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
        </div>
      )}
    </div>
  );
};

export default App;
