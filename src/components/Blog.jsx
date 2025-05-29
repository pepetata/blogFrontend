import { useRef } from "react";
import { useDispatch } from "react-redux";
import Togglable from "./Togglable";
import Button from "./Button";
import { showNotification } from "../components/helper";
import { addLikes, removeBlog } from "../reducers/blogReducer";

import "../css/Blog.css";

const Blog = (props) => {
  const dispatch = useDispatch();
  const detailsRef = useRef();
  const blog = props.blog;
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

    // event.preventDefault();
    // blogService
    //   .addLike(blog)
    //   .then((updatedBlog) => {
    //     setBlogs((blogs) =>
    //       blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    //     );
    //   })
    //   .catch((error) => {
    //     const message = `Error: ${error?.response?.data?.error || error?.message || "Unknown error"}`;
    //     dispatch(showNotification({ type: "error", message }));
    //   });
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
    } catch (error) {
      const message = `Error: ${error?.response?.data?.error || error?.message || "Unknown error"}`;
      console.error("Error creating blog:", error);
      dispatch(showNotification({ type: "error", message }));
    }
  };

  return (
    <div className="blog-container">
      <Togglable buttonLabel="View" hideLabel="Hide" ref={detailsRef}>
        {(visible, toggleVisibility) => (
          <div className={visible ? "blog-details" : ""}>
            <div
              style={{ display: "flex", alignItems: "center", fontWeight: 500 }}
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
                {blog.user === props.userId ? (
                  <Button
                    className="button delete-button"
                    text="Remove"
                    type="button"
                    onClick={() => handleRemoveBlog(blog)}
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
  );
};

export default Blog;
