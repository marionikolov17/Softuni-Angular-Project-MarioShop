const express = require('express');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

function expressConfig(app) {
    app.use(express.urlencoded({ extended: false }));
    app.use(bodyParser({ extended: false }));
    app.use(cookieParser());
    return app;
};

module.exports = expressConfig;