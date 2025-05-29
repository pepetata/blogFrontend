import { useState } from "react";
import blogService from "../services/blogs";
import Button from "./Button";
import "../css/AddBlog.css";

const BlogForm = (props) => {
  const [blogForm, setBlogForm] = useState({
    title: "",
    author: "",
    url: "",
  });

  // console.log(`----props `, props);
  const handleBlogChange = (event) => {
    const { id, value } = event.target;
    setBlogForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const addBlog = (event) => {
    event.preventDefault();
    blogService
      .create(blogForm)
      .then((response) => {
        props.setBlogs(props.blogs.concat(response));
        setBlogForm({ title: "", author: "", url: "" }); // reset fields
        // setNewBlog(false);
        props.toggleVisibility();
        props.setErrorMessage({
          type: "success",
          message: `New blog added!`,
        });
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
    <div className="add-blog-container">
      <h2>Create New Blog</h2>
      <form onSubmit={addBlog}>
        <label htmlFor="title">Title:&nbsp;</label>
        <input
          id="title"
          type="text"
          value={blogForm.title}
          onChange={handleBlogChange}
        />
        <br />
        <label htmlFor="author">Author:&nbsp;</label>
        <input
          id="author"
          type="text"
          value={blogForm.author}
          onChange={handleBlogChange}
        />
        <br />
        <label htmlFor="url">URL:&nbsp;</label>
        <input
          id="url"
          type="text"
          value={blogForm.url}
          onChange={handleBlogChange}
        />
        <br />
        <Button text="Save" type="submit" />
        <Button onClick={props.toggleVisibility} text="Cancel" type="button" />
      </form>
    </div>
  );
};

export default BlogForm;
