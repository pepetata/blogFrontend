import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import LabeledInput from "./LabledInput";
import { showNotification } from "./helper";
import { createComment } from "../reducers/commentReducer";
import { useFormFields } from "../hooks";
import { commentFormField } from "../formFields/commentFormField";

const CommentForm = ({ blogId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const emptyForm = { comment: "" };
  const [fields, clearFields] = useFormFields(commentFormField);

  const addComment = async (event) => {
    console.log(`addcomment ======`);
    const commentForm = Object.fromEntries(
      Object.values(fields).map((field) => [field.name, field.value])
    );
    console.log(`commentForm======`, commentForm);
    commentForm.blogId = blogId; // Add blogId to the comment form
    console.log(`commentForm======2`, commentForm);
    console.log(`fields======`, fields);
    event.preventDefault();
    try {
      await dispatch(createComment(blogId, commentForm));
      dispatch(
        showNotification({
          type: "success",
          message: `New comment added!`,
        })
      );
      clearFields();
    } catch (error) {
      const message = `Error: ${error?.response?.data?.error || error?.message || "Unknown error"}`;
      console.error("Error creating comment:", error);
      dispatch(showNotification({ type: "error", message }));
    }
  };

  return (
    <div className="add-comment-container">
      <form onSubmit={addComment}>
        <label>New Comment: </label>
        <input {...fields.comment} />
        {error && <div style={{ color: "red" }}>{error}</div>}

        <Button
          text="Add comment"
          type="submit"
          className="button-save button-small"
        />
      </form>
    </div>
  );
};

export default CommentForm;
