import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
// import { Link, Routes, Route } from "react-router-dom";
import Table from "react-bootstrap/Table";

const UserBlogList = () => {
  const { id } = useParams();
  const blogs = useSelector((state) => state.blogs.blogs);
  const user = useSelector((state) => state.login.user);
  const navigate = useNavigate();

  function getBlogsByUsername(blogs, name) {
    return blogs.filter((blog) => blog.user?.name === name);
  }
  const userBlogs = getBlogsByUsername(blogs, id || user.name);
  console.log(`UserBlogList - userBlogs`, userBlogs, id);

  return (
    <div>
      <h2>{id}</h2>
      <hr />
      <p>Added blogs:</p>
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`} state={{ from: location.pathname }}>
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserBlogList;
