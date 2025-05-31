import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";

const UsersSummary = () => {
  const blogs = useSelector((state) => state.blogs.blogs);
  const navigate = useNavigate();
  console.log(`UsersSummary - blogs`, blogs);

  // 1. Return an array of { username, blogCount }
  function getUserBlogCounts(blogs) {
    const counts = {};
    blogs.forEach((blog) => {
      const name = blog.user?.name || "unknown";
      counts[name] = (counts[name] || 0) + 1;
    });
    // Convert to array of objects
    return Object.entries(counts).map(([name, blogCount]) => ({
      name,
      blogCount,
    }));
  }

  const userBlogCounts = getUserBlogCounts(blogs);
  console.log("userBlogCounts", userBlogCounts);

  // 2. Get all blogs for a specific user
  const blogsForUserA = getBlogsByUsername(blogs, "a");
  console.log(blogsForUserA);

  // 2. For a given username, return all blogs by that user
  function getBlogsByUsername(blogs, username) {
    return blogs.filter((blog) => blog.user?.username === username);
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User Name</th>
            <th># Blogs</th>
          </tr>
        </thead>
        <tbody>
          {[...userBlogCounts].map((user) => (
            <tr
              key={user.name}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/users/${user.name}`)}
            >
              <td>{user.name}</td>
              <td>{user.blogCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UsersSummary;
