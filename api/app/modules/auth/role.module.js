const SQLRoute = require("../sequelize/SQLRoute");

class Role extends SQLRoute {
  models = null;
  constructor(models) {
    super(models, "Role");
    this.models = models;
  }
}

module.exports = (models) => new Role(models);
