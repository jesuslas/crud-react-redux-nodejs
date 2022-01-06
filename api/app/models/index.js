module.exports = (sequelize) => {
  // const UserModel = sequelize.import("./db/auth/users.schema");
  // const RoleModel = sequelize.import("./db/auth/role.schema");
  const PostModel = sequelize.import("./db/post.schema.js");
  return {
    Post: PostModel
  };
};
