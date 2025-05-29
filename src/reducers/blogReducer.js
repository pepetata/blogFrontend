import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = {
  blogs: [],
};

// const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs(state, action) {
      state.blogs = action.payload;
    },
    appendBlog(state, action) {
      state.blogs.push(action.payload);
    },
    deleteBlog(state, action) {
      const idToRemove = action.payload.id;
      state.blogs = state.blogs.filter((blog) => blog.id !== idToRemove);
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      const index = state.blogs.findIndex((n) => n.id === updatedBlog.id);
      if (index !== -1) {
        state.blogs[index] = updatedBlog;
      }
    },
  },
});

export const { appendBlog, setBlogs, updateBlog, deleteBlog } =
  blogSlice.actions;
export default blogSlice.reducer;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(appendBlog(newBlog));
  };
};

export const addLikes = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.addLike({
      ...blog,
      likes: blog.likes + 1,
    });
    dispatch(updateBlog(updatedBlog));
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog);
    dispatch(deleteBlog(blog));
  };
};
