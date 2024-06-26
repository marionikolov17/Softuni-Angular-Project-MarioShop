const router = require("express").Router();

const ordersService = require("./../services/ordersService");
const cartService = require("./../services/cartService");

const { isAuth, isAdmin } = require("../middlewares/authMiddleware");
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
router.get("/", isAdmin, async (req, res) => {
  try {
    const orders = await ordersService.getOrders();

    res.status(200).json({ status: "success", data: { orders } });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", data: { message: getErrorMessage(err) } });
  }
});

/* Create an order */
router.post("/", isAuth, async (req, res) => {
  try {
    await ordersService.createOrder({...req.body, userId: req.user._id});

    // Delete cart
    await cartService.updateCart(req.user._id, []);

    res
      .status(201)
      .json({
        status: "success",
        data: { message: "Order created successfully!" },
      });
  } catch (err) {
    res
      .status(400)
      .json({ status: "fail", data: { message: getErrorMessage(err) } });
  }
});

/* Get an order */
router.get("/:id", isAdmin, async (req, res) => {
  try {
    const order = await ordersService.getOrder(req.params.id);

    res.status(200).json({ status: "success", data: { order } });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", data: { message: getErrorMessage(err) } });
  }
});

/* Done an order - Admin */
router.patch("/:id/done", isAdmin, async (req, res) => {
    try {
        await ordersService.doneOrder(req.params.id);
    
        res.status(200).json({ status: "success", data: { message: "Order is done successfully!" } });
      } catch (err) {
        res
          .status(500)
          .json({ status: "error", data: { message: getErrorMessage(err) } });
      }
});


module.exports = router;
