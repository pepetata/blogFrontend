import { useSelector } from "react-redux";
import Blog from "./Blog";
import Button from "./Button";

const BlogList = (props) => {
  const blogs = useSelector((state) => state.blogs.blogs);

  return (
    <div>
      <Button onClick={() => props.setShowBlogForm(true)} text="New Blog" />
      <h2>Blogs</h2>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} userId={props.user.id} />
        ))}
    </div>
  );
};

export default BlogList;
