const { ok, fail, accepted } = require("../../commons/responses");
const SQLRoute = require("../sequelize/SQLRoute");

class Post extends SQLRoute {
  models = null;
  constructor(models) {
    super(models, "Post");
    this.models = models;
  }

 
}

module.exports = (models) => new Post(models);
