import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./blogReducer";
import notificationReducer from "./notificationReducer";
// import { loginUser } from "./loginReducer";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    // login: loginUser,
  },
});

export default store;
// This code sets up a Redux store using Redux Toolkit, which simplifies the process of creating and managing the store.
// It imports the `configureStore` function from Redux Toolkit and two reducers: `noteReducer` and `filterReducer`.
// The `configureStore` function is called with an object that specifies the reducers for the store.
// The `noteReducer` manages the state related to notes, while the `filterReducer` manages the state related to filtering notes.
