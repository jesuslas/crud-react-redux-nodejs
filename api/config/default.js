
module.exports = {
  app: {
    port: process.env.PORT || 8000,
    es_host: process.env.ES_HOST,
    jwt_secret_key: process.env.JWT_SECRET_KEY,
    environment: process.env.ENVIRONMENT || "develoment"
  },
  default: {
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "keiron",
    username: process.env.DB_USER || "root",
    port: process.env.DB_PORT || "3301",
    password: process.env.DB_PASS || "manager",
    dialect: "mysql",
    logging: process.env.DB_LOGGING || false,
    pool: {},
    // logging: false,
    dialectOptions: {
      connectTimeout: 300000,
      multipleStatements: true
    }
  },
  test: {
    host: process.env.DB_HOST,
    database: process.env.TEST_DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    dialect: "mysql",
    operatorsAliases: false,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 120000
    }
  }
};