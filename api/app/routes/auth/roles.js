const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const { validateAccountParam, isAuth } = require("../middlewares/auth");

module.exports = (models) => {
  const role = require("../../modules/auth/role.module")(models);

  router.use(bodyParser.json()); // for parsing application/json
  router.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

  router.get("/:id?", isAuth, validateAccountParam, (a, b) => role.get(a, b));
  router.patch("/:id", isAuth, validateAccountParam,isAuth, (a, b) => role.edit(a, b));
  router.post("/", isAuth, validateAccountParam, (a, b) => role.create(a, b));
  router.delete("/:id", isAuth, validateAccountParam, (a, b) => role.delete(a, b));
  
  return router;
};
