const { ok, fail, accepted } = require("../../commons/responses");
const SQLRoute = require("../sequelize/SQLRoute");

class Users extends SQLRoute {
  models = null;
  constructor(models) {
    super(models, "Users");
    this.models = models;
  }

  async get(req, res) {
    try {
      const { accountId } = req.query;
      const { id } = req.params;
      const { Users, Role } = this.models;
      const users = await Users.findAll({
        where: { ...(accountId&&{accountId}), ...(id && { id }) },
        include: [
          {
            model: Role,
            as: "user_types",
          },
        ],
      });
      ok(res)(users);
    } catch (error) {
      fail(res)(error);
    }
  }
}

module.exports = (models) => new Users(models);
