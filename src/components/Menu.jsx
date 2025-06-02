import { Link, Routes, Route, Navigate } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import BlogList from "./BlogList";
import BlogForm from "./BlogForm";
import Blog from "./Blog";
import User from "./User";
import UsersSummary from "./UsersSummary";
import UserBlogList from "./UserBlogList";
import { Login } from "./LoginForm";
import Notification from "./Notification";

const Menu = () => {
  const logged = useSelector((state) => state.login.logged);
  const user = useSelector((state) => state.login.user);
  // console.log(`Menu - logged`, logged);
  // console.log(`Menu - user`, user);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Blogs Application
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar-nav" />
          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Blogs
              </Nav.Link>
              <Nav.Link as={Link} to="/users">
                Users
              </Nav.Link>
              <Nav.Link as={Link} to={logged ? "/new" : "/login/new"}>
                New Blog
              </Nav.Link>

              <Nav.Link as={Link} to={logged ? "/user" : "/login"}>
                {logged ? `${user.name} logged in` : "Login"}
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Notification />
      <Container style={{ marginTop: "1em" }}>
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/user" element={<User />} />
          <Route path="/users" element={<UsersSummary />} />
          <Route path="/users/:id" element={<UserBlogList />} />
          <Route path="/new" element={<BlogForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/:param" element={<Login />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </>
  );
};

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>
    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>
    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

export default Menu;
