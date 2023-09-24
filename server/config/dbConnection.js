const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(process.env.DATABASE_URI)
    .then((conn) => {
      console.log(
        `Database connected successfully with ${conn.connection.host}`
      );
    })
    .catch((e) => {
      console.log("Error while database connection!");
      console.log(e);
      process.exit(1);
    });
};

module.exports = dbConnection;
