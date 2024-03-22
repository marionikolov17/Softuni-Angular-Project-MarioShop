const { isAuth, isAdmin } = require("../middlewares/authMiddleware");
const productsService = require("./../services/productsService");
const { getErrorMessage } = require("./../utils/errorUtil");

const router = require("express").Router();

/* Get all products */
router.get("/", async (req, res) => {
  const products = await productsService.getProducts();

  res.status(200).json({
    status: "success",
    data: {
      products,
    },
  });
});

/* Create product - Admin */
router.post("/", isAuth, isAdmin, async (req, res) => {
  try {
    await productsService.createProduct(req.body);

    res.status(201).json({
      status: "success",
      data: { message: "Product succesfully created!" },
    });
  } catch (err) {
    res
      .status(400)
      .json({ status: "fail", data: { message: getErrorMessage(err) } });
  }
});

/* Get One Product */
router.get("/:id", async (req, res) => {
  try {
    const product = await productsService.getProduct(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    res
      .status(404)
      .json({ status: "fail", data: { message: "Product not found!" } });
  }
});

/* Update product - Admin */
router.put("/:id", isAuth, isAdmin, async (req, res) => {
  try {
    await productsService.updateProduct(req.params.id, req.body);

    res.status(201).json({
      status: "success",
      data: { message: "Product succesfully updated!" },
    });
  } catch (err) {
    res
      .status(400)
      .json({ status: "fail", data: { message: getErrorMessage(err) } });
  }
});

/* Delete product - Admin */

module.exports = router;
