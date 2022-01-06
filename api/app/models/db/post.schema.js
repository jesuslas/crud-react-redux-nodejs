"use strict";
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define(
    "post",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        unique: true,
      }
    },
    {
      tableName: "post",
      timestamps: false,
    }
  );
  return user;
};
