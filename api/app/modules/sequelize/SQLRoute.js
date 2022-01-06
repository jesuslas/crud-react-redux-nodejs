const { ok, fail, accepted, badRequest } = require("../../commons/responses");

class SQLRoute {
  models = null;
  thisModel = null;
  constructor(models, thisModel) {
    this.models = models;
    this.thisModel = thisModel;
  }

  async get(req, res) {
    try {
      const { id } = req.params;
      const model = this.models[this.thisModel];
      const data = await model[id ? "findOne" : "findAll"]({
        where: { 
          ...(id && { id }) },
      });
      ok(res)(data);
    } catch (error) {
      fail(res)(error);
    }
  }


  async getPaging(req, res) {
    try {
      const { id } = req.params;
      const { length, limit, offset, token, name, ...filters } = req.query;
      const model = this.models[this.thisModel];
      let data = await model[id ? "findOne" : "findAndCountAll"]({
        where: {
          ...(id && { id }),
          ...(filters && { ...filters }),
          ...(name && {
            name: {
              [Op.like]: `${name}%`
            }
          })
        },
        ...(length && { limit: length }),
        ...(limit && { limit: parseInt(limit) }),
        ...(offset && offset > 0 && { offset: parseInt(offset) })
      });

      return ok(res)(data || []);
    } catch (error) {
      return fail(res)(error);
    }
  }
  async edit(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        badRequest(res)("path/:id is required");
        next();
        return;
      }
     
      const { ...body } = req.body;
      console.log('body', body);
      const model = this.models[this.thisModel];
      const [, [data]] = await model.update(
        { ...body, force: true },
        { where: { id}, individualHooks: true }
      );
      ok(res)(data);
    } catch (error) {
      fail(res)(error);
    }
  }
  async create(req, res) {
    try {
      const { ...body } = req.body;
      const model = this.models[this.thisModel];
      const data = await model.create(body);
      ok(res)(data);
    } catch (error) {
      fail(res)(error);
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        badRequest(res)("path/:id is required");
        next();
        return;
      }
      const model = this.models[this.thisModel];
      await model.destroy({
        where: { id },
        individualHooks: true,
      });
      accepted(res)();
    } catch (error) {
      fail(res)(error);
    }
  }
}

module.exports = SQLRoute;
