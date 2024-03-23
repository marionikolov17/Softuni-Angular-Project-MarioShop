const router = require("express").Router();

const ordersService = require("./../services/ordersService");

const { isAuth } = require("../middlewares/authMiddleware");
const { getErrorMessage } = require("./../utils/errorUtil");

router.param("id", async (req, res, next) => {
  try {
    const order = await ordersService.getOrder(req.params.id);

    next();
  } catch (err) {
    res
      .status(404)
      .json({ status: "fail", data: { message: "Order not found!" } });
  }
});

/* Get all orders */
router.get("/", async (req, res) => {
  const orders = await ordersService.getOrders();

  res.status(200).json({ status: "success", data: { orders } });
});

module.exports = router;
