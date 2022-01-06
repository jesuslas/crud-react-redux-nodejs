"use strict";
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define(
    "role",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          table: "account",
          field: "id",
        },
      },
    },
    {
      tableName: "role",
      timestamps: false,
    }
  );
  return user;
};
