import { useState } from "react";
import { useDispatch } from "react-redux";

import Button from "./Button";
import LabeledInput from "./LabledInput";
import { showNotification } from "../components/helper";
import { createBlog } from "../reducers/blogReducer";
import { useFormFields } from "../hooks";
import { blogFormField } from "../models/blogFormField";
import "../css/AddBlog.css";

const BlogForm = (props) => {
  const dispatch = useDispatch();
  const emptyForm = { title: "", author: "", url: "" };
  // const [blogForm, setBlogForm] = useState(emptyForm);
  const [fields, clearFields] = useFormFields(blogFormField);

  const addBlog = async (event) => {
    const blogForm = Object.fromEntries(
      Object.values(fields).map((field) => [field.name, field.value])
    );
    console.log(`blogForm======`, blogForm);
    console.log(`fields======`, fields);
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
      clearFields();
    } catch (error) {
      const message = `Error: ${error?.response?.data?.error || error?.message || "Unknown error"}`;
      console.error("Error creating blog:", error);
      dispatch(showNotification({ type: "error", message }));
    }
  };

  return (
    <div className="add-blog-container">
      <h2>Create New Blog</h2>
      <form onSubmit={addBlog}>
        <LabeledInput field={fields.title} />
        <LabeledInput field={fields.author} />
        <LabeledInput field={fields.url} />
        <br />
        <Button text="Save" type="submit" />
        <Button text="Clear" type="button" onClick={clearFields} />
        <Button onClick={props.toggleVisibility} text="Cancel" type="button" />
      </form>
    </div>
  );
};

export default BlogForm;
