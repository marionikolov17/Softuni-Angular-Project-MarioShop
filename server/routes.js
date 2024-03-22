const router = require("express").Router();

// Controllers import
const authController = require("./controllers/authController");
const productsController = require("./controllers/productsController");
const ordersController = require("./controllers/ordersController");

router.use(authController);
router.use(productsController);
router.use(ordersController);

module.exports = router;