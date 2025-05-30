import axios from "axios";

export const generalResourceService = (baseUrl, getToken) => {
  const getConfig = () => {
    const token = getToken ? getToken() : null;
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  };

  const getAll = async () => {
    const response = await axios.get(baseUrl, getConfig());
    return response.data;
  };

  const create = async (data) => {
    const response = await axios.post(baseUrl, data, getConfig());
    return response.data;
  };

  const update = async (id, updates) => {
    const response = await axios.put(`${baseUrl}/${id}`, updates, getConfig());
    return response.data;
  };

  const addLike = async (blog) => {
    const response = axios.patch(
      `${baseUrl}/${blog.id}/likes`,
      blog,
      getConfig()
    );
    return response.data;
  };

  const remove = async (id) => {
    await axios.delete(`${baseUrl}/${id}`, getConfig());
  };

  return { getAll, create, update, addLike, remove };
};

// import axios from "axios";
// let server = import.meta.env.VITE_API_URL;
// server ||= process.env.BASEURL;
// const baseUrl = server + "/api/blogs";

// let token = null;

// const setToken = (newToken) => {
//   token = `Bearer ${newToken}`;
// };

// const getAll = () => {
//   console.log(`blog service - getAll - baseUrl = `, baseUrl);
//   return axios
//     .get(baseUrl) // Return the promise here
//     .then((response) => response.data)
//     .catch((error) => {
//       console.error("Failed to fetch notes:", error);
//       throw error; // Re-throw the error to handle it in the calling code
//     });
// };

// const create = (blog) => {
//   blog.likes = 0;
//   console.log(`blog service - create blog = `, blog);
//   const config = {
//     headers: { Authorization: token },
//   };

//   console.log(`LoginForm - login - create - token = `, token);
//   const request = axios.post(baseUrl, blog, config);
//   return request.then((response) => response.data);
// };

// const addLike = (blog) => {
//   console.log(`blog service - addLike = `, blog);
//   const request = axios.patch(`${baseUrl}/${blog.id}/likes`);
//   return request.then((response) => response.data);
// };

// const remove = (blog) => {
//   console.log(`blog service - delete blog = `, blog);
//   const config = {
//     headers: { Authorization: token },
//   };

//   const request = axios.delete(`${baseUrl}/${blog.id}`, config);
//   return request.then((response) => response.data);
// };
// export default { setToken, getAll, create, addLike, remove };
