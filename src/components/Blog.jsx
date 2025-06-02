import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Togglable from "./Togglable";
import Button from "./Button";
import { showNotification } from "../components/helper";
import { addLikes, removeBlog } from "../reducers/blogReducer";

import "../css/Blog.css";
import CommentList from "./CommentList";

const Blog = (props) => {
  const blogs = useSelector((state) => state.blogs.blogs);
  const user = useSelector((state) => state.login.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const detailsRef = useRef();
  const blog = blogs.find((n) => String(n.id) === String(id));
  // console.log(`user=====`, user, blog), id;
  // console.log("Navigated from:", location.state?.from);

  if (!blog) {
    return <div>Loading blog...</div>;
  }

  const handleLikes = async (blog) => {
    try {
      await dispatch(addLikes(blog));
      dispatch(
        showNotification({
          type: "success",
          message: `Blog updated!`,
        })
      );
    } catch (error) {
      const message = `Error: ${error?.response?.data?.error || error?.message || "Unknown error"}`;
      console.error("Error updating blog:", error);
      dispatch(showNotification({ type: "error", message }));
    }
  };

  const handleRemoveBlog = async (blog) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this blog?"
    );
    if (!confirmed) return;
    try {
      console.log(`blog to remove`, blog);
      await dispatch(removeBlog(blog));
      dispatch(
        showNotification({
          type: "success",
          message: `Blog removed!!`,
        })
      );
      // Hide details first - ok
      if (props.toggleVisibility) {
        props.toggleVisibility(false);
      }
      navigate(location.state?.from || "/");
    } catch (error) {
      const message = `Error: ${error?.response?.data?.error || error?.message || "Unknown error"}`;
      console.error("Error creating blog:", error);
      dispatch(showNotification({ type: "error", message }));
    }
  };

  return (
    <div>
      <div className="blog-container">
        <Togglable
          defaultVisible={true}
          buttonLabel="View"
          hideLabel="Hide"
          ref={detailsRef}
        >
          {(visible, toggleVisibility) => (
            <div className={visible ? "blog-details" : ""}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 500,
                }}
              >
                <span>{blog.title}</span>
                <span style={{ marginLeft: "0.5em" }}>
                  <Button
                    className="button button-small"
                    onClick={toggleVisibility}
                    type="button"
                    text={visible ? "Hide" : "View"}
                  />
                </span>
              </div>
              {visible && (
                <div>
                  <div>Author: {blog.author}</div>
                  <div>URL: {blog.url}</div>
                  <div>
                    Likes: {blog.likes}
                    <Button
                      className="button button-small"
                      text="Like"
                      type="button"
                      onClick={() => handleLikes(blog)}
                    />
                  </div>
                  {blog.user.id === user.id ? (
                    <Button
                      className="button delete-button"
                      text="Remove"
                      type="button"
                      onClick={() => handleRemoveBlog(blog.id)}
                    />
                  ) : (
                    ""
                  )}
                </div>
              )}
            </div>
          )}
        </Togglable>
      </div>
      <br />
      <CommentList blogId={blog.id} />
    </div>
  );
};

export default Blog;
