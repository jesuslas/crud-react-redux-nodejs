const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const { validateAccountParam, isAuth } = require("./middlewares/auth");


module.exports = (models) => {
  const post = require("../modules/post/post.module")(models);
console.log('aqui');
  router.use(bodyParser.json()); // for parsing application/json
  router.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

  router.get("/:id?", (a, b) => post.getPaging(a, b));
  router.patch("/:id", (a, b) => post.edit(a, b));
  router.post("/",  (a, b) => post.create(a, b));
  router.delete("/:id", (a, b) => post.delete(a, b));

  return router;
};
