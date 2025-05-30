import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import "./App.css";
import { showNotification } from "./components/helper";
import { initializeBlogs } from "./reducers/blogReducer";
import { getUser } from "./reducers/loginReducer";

const App = () => {
  const dispatch = useDispatch();
  // const [blogs, setBlogs] = useState([]);
  const noErrorMessage = { type: "", message: "" };
  const [errorMessage, setErrorMessage] = useState(noErrorMessage);
  const [showBlogForm, setShowBlogForm] = useState(false);
  // will keep this useState as it is only used in this component
  // and not in any child component, so no need to pass it down

  const blogFormRef = useRef();

  useEffect(() => {
    const fetchBlogs = async () => {
      dispatch(getUser());
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
    <div className="container">
      <Menu />
      {/* <Notification /> */}
      <Footer />
    </div>
  );
};

export default App;
