import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
// import blogService from "./services/blogs";
import { Logged, Login, Logout } from "./components/LoginForm";
import "./App.css";
import BlogList from "./components/BlogList";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import { showNotification } from "./components/helper";
import { initializeBlogs } from "./reducers/blogReducer";

const App = () => {
  const dispatch = useDispatch();
  // const [blogs, setBlogs] = useState([]);
  const noErrorMessage = { type: "", message: "" };
  const [errorMessage, setErrorMessage] = useState(noErrorMessage);
  const [showBlogForm, setShowBlogForm] = useState(false);
  // will keep this useState as it is only used in this component
  // and not in any child component, so no need to pass it down
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    const fetchBlogs = async () => {
      const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        setUser(user);
        // blogService.setToken(user.token);
      }
      try {
        // await blogService.getAll().then((blogs) => setBlogs(blogs));
        await dispatch(initializeBlogs());
      } catch (error) {
        const message = `Error: ${error?.response?.data?.error || error?.message || "Unknown error"}`;
        dispatch(showNotification({ type: "critical", message }));
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      <h2>Blogs Application</h2>
      <Notification type={errorMessage.type} message={errorMessage.message} />

      {!user && <Login setUser={setUser} setShowBlogForm={setShowBlogForm} />}
      {user && (
        <div>
          <Logged
            user={user}
            setUser={setUser}
            setShowBlogForm={setShowBlogForm}
          />

          {!showBlogForm && (
            <BlogList user={user} setShowBlogForm={setShowBlogForm} />
          )}

          {showBlogForm && (
            <BlogForm toggleVisibility={() => setShowBlogForm(false)} />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
