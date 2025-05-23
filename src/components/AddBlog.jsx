import { useState, useEffect } from "react";
import blogService from "../services/blogs";
import Button from "./Button";
import "../css/AddBlog.css";

const AddBlog = ({ setNewBlog, setBlogs, blogs, setErrorMessage }) => {
  const [blogForm, setBlogForm] = useState({
    title: "",
    author: "",
    url: "",
  });

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
        setBlogs(blogs.concat(response));
        setBlogForm({ title: "", author: "", url: "" }); // reset fields
        setNewBlog(false);
        setErrorMessage({
          type: "success",
          message: `New blog added!`,
        });
      })
      .catch((error) => {
        setErrorMessage({
          type: "error",
          message: `Error: ${error.response?.data?.error || error.message}`,
        });
      });
    setTimeout(() => {
      setErrorMessage({ type: "", message: "" });
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
        <Button onClick={() => setNewBlog(false)} text="Cancel" type="button" />
      </form>
    </div>
  );
};

export default AddBlog;
