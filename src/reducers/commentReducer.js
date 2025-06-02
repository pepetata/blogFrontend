import { createSlice } from "@reduxjs/toolkit";
import { generalResourceService } from "../services/resourceService";

const getToken = () => {
  const user = JSON.parse(
    window.localStorage.getItem("loggedBlogAppUser") || "null"
  );
  return user ? user.token : null;
};

const commentService = generalResourceService(
  import.meta.env.VITE_API_URL + "/api/comments",
  getToken
);

const commentSlice = createSlice({
  name: "comments",
  initialState: {},
  reducers: {
    setComments(state, action) {
      const { blogId, comments } = action.payload;
      state[blogId] = comments;
      console.log(`setComments --- blogId`, blogId, comments, action.payload);
    },
    addComment(state, action) {
      const { blogId, comment } = action.payload;
      if (!state[blogId]) state[blogId] = [];
      state[blogId].push(comment);
    },
  },
});

export const { setComments, addComment } = commentSlice.actions;
export default commentSlice.reducer;

export const initializeComments = (blogId) => {
  return async (dispatch) => {
    const comments = await commentService.getCommentsForBlog(blogId);
    console.log(`initializeComments --- blogId`, blogId, comments);
    dispatch(setComments({ blogId, comments }));
  };
};

export const createComment = (blogId, content) => {
  return async (dispatch) => {
    const newComment = await commentService.create(content);
    dispatch(addComment({ blogId, comment: newComment }));
    console.log(`createcomment ========`, newComment);
  };
};
