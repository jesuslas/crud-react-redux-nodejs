const jwt = require("jsonwebtoken");
const { env } = require("./env");
const { unAuthorized } = require("./responses");

const config = {
  secretOrPrivateKey: process.env.JWT_SECRET_KEY || "iQLCsRUf3OnsTThgkgZ6",
  options: {
    expiresIn: process.env.JWT_OPT_EXPIRESIN || "24h",
  },
  refreshTokenOptions: {
    expiresIn: process.env.JWT_REFRESH_TOKEN_OPT_EXPIRESIN || "40m",
  },
};

const jwtAuth = (req, res, next) => {
  if (req.method !== "OPTIONS") {
    jwtVerify(req, res, next);
  } else {
    next();
  }
};

const jwtVerify = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    token = req.query.token;
  }
 
  jwt.verify(token, config.secretOrPrivateKey, (err, decoded) => {
    if (err || !decoded) {
      return unAuthorized(res)({ msg: "Unauthorized" });
    }
    req.user = decoded;
    next();
  });
};

const jwtTokenize = (target, options = {}) => {
  const _options = Object.assign({}, config.options, options);
  try {
    return jwt.sign(target, config.secretOrPrivateKey, _options);
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  jwtTokenize,
  jwtAuth,
};
