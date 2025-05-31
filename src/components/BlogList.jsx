import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs.blogs);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(`BlogList - blogs`, blogs);

  return (
    <div>
      <h2>Blogs</h2>
      <Table striped bordered hover>
        <tbody>
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <tr
                key={blog.id}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate(`/blogs/${blog.id}`, {
                    state: { from: location.pathname },
                  })
                }
              >
                <td>{blog.title}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BlogList;
