import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { showNotification } from "../components/helper";
import { initializeComments } from "../reducers/commentReducer";
import CommentForm from "./CommentForm";

const CommentList = ({ blogId }) => {
  const EMPTY_ARRAY = [];
  const comments = useSelector((state) => state.comment[blogId] || EMPTY_ARRAY);
  const logged = useSelector((state) => state.login.logged);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(`CommentList - comments`, comments);
  console.log(`blogid`, blogId);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        await dispatch(initializeComments(blogId));
        console.log(`CommentList -  useEffect comments`, comments);
      } catch (error) {
        const message = `Error: ${error?.response?.data?.error || error?.message || "Unknown error"}`;
        dispatch(showNotification({ type: "critical", message }));
      }
    };
    fetchComments();
  }, []);

  return (
    <div>
      <h2>Comments</h2>
      {logged ? (
        <CommentForm blogId={blogId} />
      ) : (
        <p>
          Please{" "}
          <Link to={`/login`} state={{ from: location.pathname }}>
            login
          </Link>{" "}
          to add a comment.
        </p>
      )}
      {comments.length === 0 && <p>No comments yet.</p>}
      <Table striped bordered hover>
        <tbody>
          {[...comments]
            .sort((a, b) => b.likes - a.likes)
            .map((comment) => {
              const dateObj = new Date(comment.date);
              const formattedDate = dateObj.toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              });
              // formattedDate will be like "Jun 10, 2024", so let's format as "Jun-10-2024"
              const [month, day, year] = formattedDate
                .replace(",", "")
                .split(" ");
              const displayDate = `${month}-${day}-${year}`;
              return (
                <tr key={comment.id}>
                  <td>{comment.comment}</td>
                  <td>{displayDate}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default CommentList;
