const express = require('express');

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

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});