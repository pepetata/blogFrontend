import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams, useNavigate } from "react-router-dom";
import Togglable from "./Togglable";
import Button from "./Button";
import { showNotification } from "./helper";
import { addLikes, removeBlog } from "../reducers/blogReducer";

import "../css/Blog.css";
import UsersSummary from "./UsersSummary";
import UserBlogList from "./UserBlogList";
import { Logout } from "./LoginForm";

const User = (props) => {
  const logged = useSelector((state) => state.login.logged);
  const user = useSelector((state) => state.login.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout, setLogout] = useState(false);
  console.log(`User===== logout `, logout);

  useEffect(() => {
    if (!logged && !logout) {
      dispatch(
        showNotification({
          type: "error",
          message: "You must be logged in to view this page.",
        })
      );
      navigate("/");
    }
    if (logout) navigate("/");
  }, [logged, props]);

  console.log(`User -----`, user, logged);
  // if (!logged) navigate("/");

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <Logout setLogout={setLogout} />
      <UserBlogList />
    </div>
  );
};

export default User;
