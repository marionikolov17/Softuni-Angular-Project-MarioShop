const express = require("express");
const mongoose = require("mongoose");

// Config imports
const expressConfig = require("./config/expressConfig");

// Router import
const router = require("./routes");

const app = express();

// Config middlewares
expressConfig(app);

// Auth middleware

// App router middleware
app.use(router);

const PORT = 3000;

mongoose
  .connect("mongodb://localhost:27017/", { dbName: "marioshop" })
  .then(() => {
    console.log("DB connected successfully!");
    app.listen(PORT, () => {
      console.log(
        `Server is listening on port ${PORT} - http://localhost:${PORT}`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
