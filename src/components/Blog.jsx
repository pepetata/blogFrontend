import { useRef } from "react";
import Togglable from "./Toggable";
import Button from "./Button";
import blogService from "../services/blogs";

import "../css/Blog.css";

const Blog = (props) => {
  const detailsRef = useRef();

  const addLikes = (blog) => {
    // event.preventDefault();
    blogService
      .addLike(blog)
      .then((response) => {
        props.updateBlog(response);
      })
      .catch((error) => {
        props.setErrorMessage({
          type: "error",
          message: `Error: ${error.response?.data?.error || error.message}`,
        });
      });
    setTimeout(() => {
      props.setErrorMessage({ type: "", message: "" });
    }, 5000);
  };

  const removeBlog = (blog) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this blog?"
    );
    if (!confirmed) return;
    blogService
      .remove(blog)
      .then((response) => {
        props.removeBlog(blog);
      })
      .catch((error) => {
        props.setErrorMessage({
          type: "error",
          message: `Error: ${error.response?.data?.error || error.message}`,
        });
      });
    setTimeout(() => {
      props.setErrorMessage({ type: "", message: "" });
    }, 5000);
  };

  return (
    <div className="blog-container">
      <Togglable buttonLabel="View" hideLabel="Hide" ref={detailsRef}>
        {(visible, toggleVisibility) => (
          <div className={visible ? "blog-details" : ""}>
            <div
              style={{ display: "flex", alignItems: "center", fontWeight: 500 }}
            >
              <span>{props.blog.title}</span>
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
                <div>Author: {props.blog.author}</div>
                <div>URL: {props.blog.url}</div>
                <div>
                  Likes: {props.blog.likes}
                  <Button
                    className="button button-small"
                    text="Like"
                    type="button"
                    onClick={() => addLikes(props.blog)}
                  />
                </div>
                {props.blog.user === props.userId ? (
                  <Button
                    className="button delete-button"
                    text="Remove"
                    type="button"
                    onClick={() => removeBlog(props.blog)}
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
