export const UserStatus = {
  GET_POST: "getPost",
  LOAD_POST: "loadPost",
  UPDATE_POST: "updatePost",
  ADD_POST: "addPost",
  DEL_POST: "delPost"
};

export const getPost = () => ({
  type: UserStatus.GET_POST
});
export const loadPost = posts => ({
  type: UserStatus.LOAD_POST,
  posts
});

export const updatePost = (id, post) => ({
  type: UserStatus.UPDATE_POST,
  id, post
});

export const addPost = post => ({
  type: UserStatus.ADD_POST,
  post
});
export const delPost = id => ({
  type: UserStatus.DEL_POST,
  id
});
