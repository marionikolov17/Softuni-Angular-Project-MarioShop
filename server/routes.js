const router = require("express").Router();

// Controllers import
const authController = require("./controllers/authController");
const productsController = require("./controllers/productsController");

router.use(authController);
router.use(productsController);

module.exports = router;