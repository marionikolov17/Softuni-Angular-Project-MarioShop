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

/* isOwner - middleware */
const isOwner = async (req, res, next) => {
  try {
    const cart = await cartService.getCart(req.params.id);

    /* Check if cart is to current user */
    if (cart.userId != req.user._id) {
      res.status(401).json({
        status: "fail",
        data: { message: "You are unauthorized to view this cart!" },
      });
    }

    req.cart = cart;
    next();
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", data: { message: getErrorMessage(err) } });
  }
};

/* Get cart */
router.get("/:id", isAuth, isOwner, async (req, res) => {
  res.status(200).json({ status: "success", data: { cart: req.cart } });
});

/* Update cart */
router.put("/:id", isAuth, isOwner, async (req, res) => {
  try {
    await cartService.updateCart(req.params.id, req.body);

    res.status(200).json({ status: "success", data: { message: "Cart successfully updated!" } });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", data: { message: getErrorMessage(err) } });
  }
});

module.exports = router;
