// jest.setup.js
const { sequelize } = require("../models");

module.exports = async () => {
  // Sync all models
  await sequelize.sync({ force: true });
};
