const RoleModel = require("../models/role.model");
const mongoose = require("mongoose");

const getPermissionsByRoles = (roles) => {
  if (!roles || typeof roles !== "object") {
    return [];
  }

  const filter = roles.map((rol) => {
    return { _id: mongoose.Types.ObjectId(rol) };
  });
  const aggregation = [
    {
      $match: {
        $or: filter,
      },
    },
    {
      $lookup: {
        from: "permissions",
        localField: "permissions",
        foreignField: "_id",
        as: "permissions",
      },
    },
    {
      $unwind: {
        path: "$permissions",
      },
    },
    {
      $replaceRoot: {
        newRoot: "$permissions",
      },
    },
  ];

  return RoleModel.aggregate(aggregation);
};

module.exports = {
  getPermissionsByRoles,
};
