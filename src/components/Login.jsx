import { useState, useEffect } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import Button from "../components/Button";

export const Login = ({ setUser, setErrorMessage }) => {
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
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(`exception========`, exception);
      setUser(null);
      setErrorMessage({ type: "error", message: "Wrong credentials" });
      setTimeout(() => {
        setErrorMessage({ type: "", message: "" });
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
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password&nbsp;
          <input
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

export const Logged = () => {
  return (
    <div>
      <p>{user.name} logged-in</p>
      {/* <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}> */}
      <Logout setUser={setUser} />
      {/* </div> */}
    </div>
  );
};

export const Logout = ({ setUser, setNewBlog }) => {
  const handleLogout = async (event) => {
    event.preventDefault();

    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) return;

    window.localStorage.removeItem("loggedBlogAppUser");
    blogService.setToken(null);
    setUser(null);
    setNewBlog(false);
  };

  return <Button onClick={handleLogout} text="Logout" />;
};

// export default { Login, Logged, Logout };
