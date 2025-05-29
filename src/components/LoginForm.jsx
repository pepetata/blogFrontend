import { useState, useEffect } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import Button from "./Button";

// export const Login = ({ setUser, setErrorMessage }) => {
export const Login = (props) => {
  // console.log(`-------- Login props`, props);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      console.log(`========== user`, username, password);
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      props.setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(`exception========`, exception);
      props.setUser(null);
      props.setErrorMessage({ type: "error", message: "Wrong credentials" });
      setTimeout(() => {
        props.setErrorMessage({ type: "", message: "" });
      }, 5000);
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
        <Button type="submit" text="Login" />
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

export const Logout = ({ setUser, setShowBlogForm: setShowBlogForm }) => {
  const handleLogout = async (event) => {
    event.preventDefault();

    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) return;

    window.localStorage.removeItem("loggedBlogAppUser");
    blogService.setToken(null);
    setUser(null);
    setShowBlogForm(false);
  };

  return <Button onClick={handleLogout} text="Logout" />;
};

// export default { Login, Logged, Logout };
