"use strict";
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define(
    "user",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
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
      tableName: "users",
      timestamps: true,
    }
  );
  return user;
};
