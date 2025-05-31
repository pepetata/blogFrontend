import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import LabeledInput from "./LabledInput";
import { showNotification } from "../components/helper";
import { createBlog } from "../reducers/blogReducer";
import { useFormFields } from "../hooks";
import { blogFormField } from "../formFields/blogFormField";
import "../css/AddBlog.css";

const BlogForm = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      // props.toggleVisibility(false);
      dispatch(
        showNotification({
          type: "success",
          message: `New blog added!`,
        })
      );
      console.log("Blog created successfully:", blogForm);
      clearFields();
      navigate("/user");
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
        <Button text="Save" type="submit" className="button-save" />
        <Button
          text="Clear"
          type="button"
          onClick={clearFields}
          className="button-clear"
        />
        <Button
          onClick={() => navigate("/")}
          text="Cancel"
          type="button"
          className="button-cancel"
        />
      </form>
    </div>
  );
};

export default BlogForm;
