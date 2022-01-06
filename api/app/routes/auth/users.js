const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const { validateAccountParam, isAuth } = require("../middlewares/auth");

module.exports = (models) => {
  const users = require("../../modules/auth/users.module")(models);

  router.use(bodyParser.json()); // for parsing application/json
  router.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

  router.get("/:id?", isAuth, validateAccountParam, (a, b) => users.get(a, b));
  router.patch("/:id", isAuth, validateAccountParam,isAuth, (a, b) => users.edit(a, b));
  router.post("/", isAuth, validateAccountParam, (a, b) => users.create(a, b));
  router.delete("/:id", isAuth, validateAccountParam, (a, b) => users.delete(a, b));
  return router;
};
