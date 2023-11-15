const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;
const sequelize = require("./database"); // Adjust the path according to your project structure

const User = require("../models/user")(sequelize, DataTypes);
const Picture = require("../models/picture")(sequelize, DataTypes);

// Defining the relationships
Picture.belongsTo(User, { as: "user", foreignKey: "id" });
User.hasMany(Picture, { as: "pictures" });

module.exports = { sequelize, User, Picture };
