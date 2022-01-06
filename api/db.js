const Sequelize = require("sequelize");
const config = require("./config/default");

module.exports = env => {
  env = env === "test" ? "test" : "default";
  console.log(config[env]);
  const sequelize = new Sequelize(config[env]);
  const models = require("./app/models")(sequelize);
  return { models, sequelize };
};
