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
  console.log(`blog service - create blog = `, blog);
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.post(baseUrl, blog, config);
  return request.then((response) => response.data);
};

export default { getAll, create, setToken };
