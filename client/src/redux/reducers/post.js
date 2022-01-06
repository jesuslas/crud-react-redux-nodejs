import { UserStatus } from "../actions/post";

const stringUser = sessionStorage.post || null;
const initialState = JSON.parse(stringUser);

const post = (state = initialState, { posts = {}, post, id, type, ...rest }) => {
  let expirationDate = new Date(new Date().getTime() + 60000 * 1);
  switch (type) {
    case UserStatus.GET_POST:
      const data = JSON.parse(sessionStorage.getItem("post") || "[]");
      return data;
    case UserStatus.LOAD_POST:
      const res = { ...state, posts, expirationDate };
        sessionStorage.setItem("post", JSON.stringify(res));
      return res;
    case UserStatus.UPDATE_POST:
      const postIndex = state.posts.findIndex((i)=>i.id===id)
      state.posts[postIndex] = post;
      const newPosts = state.posts;
      const resPOST = { ...state, posts:newPosts, expirationDate };
      sessionStorage.setItem("post", JSON.stringify(resPOST));
      return resPOST;
    case UserStatus.DEL_POST:
      const delPosts = state.posts.filter(i=>i.id!==id);
      const resDelPost = { ...state, posts:delPosts, expirationDate };
      sessionStorage.setItem("post", JSON.stringify(resDelPost));
      return resDelPost;
    case UserStatus.ADD_POST:
      state.posts.push(post);
      const addPosts = state.posts;
      const resAddPost = { ...state, posts:addPosts, expirationDate };
      sessionStorage.setItem("post", JSON.stringify(resAddPost));
      return resAddPost;
    default:
      return state;
  }
};

export default post;
