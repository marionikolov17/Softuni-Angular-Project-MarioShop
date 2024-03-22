const express = require('express');

// Config imports
const expressConfig = require("./config/expressConfig");

// Router import
const router = require("./")

const app = express();

// Config middlewares
expressConfig(app);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});