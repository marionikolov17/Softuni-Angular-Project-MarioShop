const router = require("express").Router();

// Controllers import
const authController = require("./controllers/authController");

router.use(authController);

module.exports = router;