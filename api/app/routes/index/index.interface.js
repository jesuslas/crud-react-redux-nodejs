// const authRouter = require("../auth/auth");
// const usersRouter = require("../auth/users");
// const rolesRouter = require("../auth/roles");
const postRouter = require("../post.routes");

const routes = {
  // usersRouter,
  // rolesRouter,
  postRouter
};
const exportWithModels = (models) =>
  Object.keys(routes).reduce(
    (all, route) => ({ ...all, [route]: routes[route](models) }),
    {}
  );

module.exports = {
  exportWithModels,
};
