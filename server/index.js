const express = require("express");
const mongoose = require("mongoose");

// Config imports
const expressConfig = require("./config/expressConfig");

// Auth middleware import
const { authMiddleware } = require("./middlewares/authMiddleware");

// Router import
const router = require("./routes");

const app = express();
// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// Config middlewares
expressConfig(app);

// Auth middleware
app.use(authMiddleware);

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
