import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import {showNotification} from "../components/helper";

// const loginSlice = createSlice({
//   name: "login",
//     initialState: {
//         logged: false,
//         user: {username: "", password: "", name: ""},
//   },
//   reducers: {
//     // setLogin(state, action) {
//     //     state.login = action.payload;
//     //   },
//     setUser(state, action) {
//           //   state.user = action.payload;
//           console.log(`---- user`,state.user, action.payload);
//           const user = action.payload;
//           const newU = { username: "", password: "", ...action.payload }
//           console.log(`new`, newU, user);
//           state.user = newU
//         //   return { username: "", password: "", ...action.payload };
//       },
//     setLogged(state, action) {
//       state.logged = action.payload;
//     }
//   },
// });

// export const { setLogged , setUser} = loginSlice.actions;
// export default loginSlice.reducer;


export const loginUser = content => {
    return async dispatch => {
      const user = await loginService.login(content);
      // console.log(`LoginUser -------`,user);
        // dispatch(setUser(user));
        // console.log(`logou???????????????????????????????????`,);
        window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
        blogService.setToken(user.token);
        // dispatch(setLogged(true));
      dispatch(showNotification({ type: "success", message: `Welcome ${user.name}` }));
      return user
  }
}