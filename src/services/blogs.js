import axios from "axios";
let server = import.meta.env.VITE_API_URL;
server ||= process.env.BASEURL;
const baseUrl = server + "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (blog) => {
  blog.likes = 0;
  console.log(`blog service - create blog = `, blog);
  const config = {
    headers: { Authorization: token },
  };

  console.log(`LoginForm - login - create - token = `, token);
  const request = axios.post(baseUrl, blog, config);
  return request.then((response) => response.data);
};

const addLike = (blog) => {
  console.log(`blog service - addLike = `, blog);
  const request = axios.patch(`${baseUrl}/${blog.id}/likes`);
  return request.then((response) => response.data);
};

const remove = (blog) => {
  console.log(`blog service - delete blog = `, blog);
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.delete(`${baseUrl}/${blog.id}`, config);
  return request.then((response) => response.data);
};
export default { setToken, getAll, create, addLike, remove };
