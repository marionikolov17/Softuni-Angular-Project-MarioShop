const router = require("express").Router();

// Controllers import
const authController = require("./controllers/authController");
const productsController = require("./controllers/productsController");
const ordersController = require("./controllers/ordersController");

router.use("/auth", authController);
router.use("/products", productsController);
router.use("/orders", ordersController);

module.exports = router;