const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();

module.exports = (models) => {
  const auth = require("../../modules/auth/auth.module")(models);

  router.use(bodyParser.json()); // for parsing application/json
  router.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

  router.post("/login", (a, b) => auth.login(a, b));
  return router;
};
