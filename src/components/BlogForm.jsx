import { useState } from "react";
import { useDispatch } from "react-redux";

import blogService from "../services/blogs";
import Button from "./Button";
import { showNotification } from "../components/helper";
import { createBlog } from "../reducers/blogReducer";
import "../css/AddBlog.css";

const BlogForm = (props) => {
  const dispatch = useDispatch();
  const emptyForm = { title: "", author: "", url: "" };
  const [blogForm, setBlogForm] = useState(emptyForm);

  const handleBlogChange = (event) => {
    const { id, value } = event.target;
    setBlogForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      await dispatch(createBlog(blogForm));
      props.toggleVisibility(false);
      dispatch(
        showNotification({
          type: "success",
          message: `New blog added!`,
        })
      );
      console.log("Blog created successfully:", blogForm);
      setBlogForm(emptyForm); // reset fields
    } catch (error) {
      const message = `Error: ${error?.response?.data?.error || error?.message || "Unknown error"}`;
      console.error("Error creating blog:", error);
      dispatch(showNotification({ type: "error", message }));
    }
  };

  return (
    <div className="add-blog-container">
      <h2>Create New Blog</h2>
      <form name="blogForm" onSubmit={addBlog}>
        <label htmlFor="title">Title:&nbsp;</label>
        <input
          id="title"
          name="title"
          type="text"
          value={blogForm.title}
          onChange={handleBlogChange}
          autoComplete="on"
        />
        <br />
        <label htmlFor="author">Author:&nbsp;</label>
        <input
          id="author"
          name="author"
          type="text"
          value={blogForm.author}
          onChange={handleBlogChange}
          autoComplete="on"
        />
        <br />
        <label htmlFor="url">URL:&nbsp;</label>
        <input
          id="url"
          name="url"
          type="text"
          value={blogForm.url}
          onChange={handleBlogChange}
          autoComplete="on"
        />
        <br />
        <Button text="Save" type="submit" />
        <Button onClick={props.toggleVisibility} text="Cancel" type="button" />
      </form>
    </div>
  );
};

export default BlogForm;
