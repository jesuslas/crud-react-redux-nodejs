const { badRequest } = require("../../commons/responses");
const jwt = require("../../commons/jwt");

const isAuth = jwt.jwtAuth;

const isValidId = (value) => isNaN(parseInt(value));

const validateAccountParam = (req, res, next) => {
  const {user:{user_types:{name:role}}} = req;
  const isAdmin = role === "admin";
  if (req.method === "OPTIONS" || isAdmin) {
    req.query.accountId = undefined
    return next()
  }
    req.query.accountId && isValidId(isValidId)
      ? next()
      : badRequest(res)({
          msg: "Account parameter is required."
      })
  };

module.exports = {
  validateAccountParam,
  isAuth
};
