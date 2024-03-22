const router = require("express").Router();

// Controllers import
const authController = require("./controllers/authController");
const productsController = require("./controllers/productsController");
const ordersController = require("./controllers/ordersController");
const cartController = require("./controllers/cartController");

router.use("/auth", authController);
router.use("/products", productsController);
router.use("/orders", ordersController);
router.use("/cart", cartController);

module.exports = router;