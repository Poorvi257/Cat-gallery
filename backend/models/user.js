"use strict";

const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // Helper method for hiding sensitive information
    toJSON() {
      return { ...this.get(), password: undefined };
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, 100], // Adjust the length as per your requirement
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  // Hook to hash password before saving a user
  User.beforeSave(async (user) => {
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  });

  return User;
};
