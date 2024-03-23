const router = require("express").Router();

const cartService = require("./../services/cartService");

const { isAuth, isAdmin } = require("../middlewares/authMiddleware");
const { getErrorMessage } = require("./../utils/errorUtil");

router.param("id", async (req, res, next) => {
  try {
    const cart = await cartService.getCart(req.params.id);

    next();
  } catch (err) {
    res
      .status(404)
      .json({ status: "fail", data: { message: "Order not found!" } });
  }
});

/* Get cart */
router.get("/:id", isAuth, async (req, res) => {
  try {
    const cart = await cartService.getCart(req.params.id);

    /* Check if cart is to current user */
    if (cart.userId != req.user._id) {
        res.status(401).json({ status: "fail", data: { message: "You are unauthorized to view this cart!" } });
    }

    res.status(200).json({ status: "success", data: { cart } });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", data: { message: getErrorMessage(err) } });
  }
});

module.exports = router;
