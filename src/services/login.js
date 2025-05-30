import axios from "axios";
let server = import.meta.env.VITE_API_URL;
server ||= process.env.BASEURL;
const baseUrl = server + "/api/login";

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  console.log(`login.js - login response`, response);
  return response.data;
};

export default { login };
