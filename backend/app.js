const express = require("express");
const userRoutes = require("./routes/v1/userRoutes");
const bodyParser = require("body-parser");
// Import models and associations
const db = require("./models");
require("./config/associations"); // Adjust the path as necessary

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", userRoutes);

// Export the app instance for testing
module.exports = app;

// Start the server only if the file is run directly (not when imported)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;

  // Synchronize the database and then start the server
  db.sequelize
    .sync()
    .then(() => {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
      console.error("Error during database synchronization:", err);
    });
}
