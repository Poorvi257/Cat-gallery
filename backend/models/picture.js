"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Picture = sequelize.define(
    "Picture",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      access: {
        type: DataTypes.ENUM("private", "public", "shared"),
        defaultValue: "private",
      },
      userId: {
        // Foreign key to associate Picture with a User
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true, // Enable timestamps for createdAt and updatedAt
    }
  );

  Picture.associate = (models) => {
    // Defining the relationship between Picture and User
    Picture.belongsTo(models.User, {
      foreignKey: "id", // Corrected foreign key reference
      as: "user",
    });
  };

  return Picture;
};
