import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import blogService from "../services/resourceService";
import Button from "./Button";
import { showNotification } from "../components/helper";
import { loginUser, logoutUser } from "../reducers/loginReducer";

export const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { param } = useParams();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await dispatch(loginUser({ username, password }));
      // blogService.setToken(user.token);
      // props.setUser(user);
      setUsername("");
      setPassword("");
      // props.setShowBlogForm(false);
      navigate(param ? `/${param}` : `/`);
    } catch (error) {
      console.error("Error login:", error);
      const message = `Error: ${error?.response?.data?.error || error?.message || "Unknown error"}`;
      dispatch(showNotification({ type: "error", message }));
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username&nbsp;
          <input
            type="text"
            id="login-username"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password&nbsp;
          <input
            id="login-password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <br />
        <Button type="submit" text="Login" className="button-save" />
      </form>
    </div>
  );
};

export const Logged = (props) => {
  // console.log(`---- Logged props`, props);
  return (
    <div>
      <span style={{ marginRight: "0.5em" }}>{props.user.name} logged-in</span>
      {/* <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}> */}
      <Logout setUser={props.setUser} setShowBlogForm={props.setShowBlogForm} />
      {/* </div> */}
    </div>
  );
};

export const Logout = ({ setLogout }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async (event) => {
    event.preventDefault();

    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) return;

    dispatch(logoutUser());
    setLogout(true);
    navigate(`/`);

    // blogService.setToken(null);
    // setUser(null);
    // setShowBlogForm(false);
  };

  return (
    <Button onClick={handleLogout} text="Logout" className="button-logout" />
  );
};
