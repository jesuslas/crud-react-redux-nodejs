const express = require("express");
const bodyParser = require("body-parser");
const { validateAccountParam, isAuth } = require("../routes/middlewares/auth");
const router = express.Router();
const apiRouter = express.Router();
const { exportWithModels } = require("./index/index.interface");

const { headersRoutes } = require("./index/index.headers");
module.exports = (models) => {
  router.use(headersRoutes);
  apiRouter.use(bodyParser.json()); // for parsing application/json
  apiRouter.use(
    bodyParser.urlencoded({
      extended: false,
    })
  ); // for parsing application/x-www-form-urlencoded

  const {
    // authRouter,
    // usersRouter,
    // rolesRouter,
    postRouter
  } = exportWithModels(models);

  // apiRouter.use("/roles", rolesRouter);
  // apiRouter.use("/users",  usersRouter);
  apiRouter.use("/post",  postRouter);
  
  /* GET home page. */
  router.get("/", function (req, res, next) {
    res.status(200).send({
      msg: "Servidor api",
    });
  });
  
  // router.use("/auth", authRouter);
  router.use("/api",  apiRouter);
  return router;
};
