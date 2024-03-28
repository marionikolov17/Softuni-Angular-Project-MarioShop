const { isAuth, isAdmin } = require("../middlewares/authMiddleware");
const productsService = require("./../services/productsService");
const { getErrorMessage } = require("./../utils/errorUtil");

const router = require("express").Router();

router.param("id", async (req, res, next) => {
  try {
    const product = await productsService.getProduct(req.params.id);

    next();
  } catch (err) {
    res
      .status(404)
      .json({ status: "fail", data: { message: "Product not found!" } });
  }
});

/* Get all products */
router.get("/", async (req, res) => {
  const { search, category, minPrice, maxPrice, sortBy } = req.query;
  //console.log(search);

  let products = await productsService.getProducts();

  // Query params filter and sort
  // Filter
  if (search) {
    products = products.filter(product => product.title.toLowerCase().includes(search.toLocaleString().toLowerCase()));
  }

  if (category && (category === "laptops" || category === "computers")) {
    products = products.filter(product => product.category === category);
  }

  if (minPrice) {
    products = products.filter(product => product.price >= +minPrice);
  }

  if (maxPrice) {
    products = products.filter(product => product.price <= +maxPrice);
  }

  if (minPrice && maxPrice) {
    products = products.filter(product => product.price >= +minPrice && product.price <= +maxPrice);
  }
  // Sort
  if (sortBy) {
    if (sortBy === "priceUp") {
      products = products.sort((a, b) => a.price-b.price);
    } else if (sortBy === "priceDown") {
      products = products.sort((a, b) => b.price-a.price);
    } else if (sortBy === "newAdded") {
      products = products.sort((a, b) => new Date(b.createdAt)-new Date(a.createdAt));
    } else if (sortBy === "lastAdded") {
      products = products.sort((a, b) => new Date(a.createdAt)-new Date(b.createdAt));
    }
  }

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
  const product = await productsService.getProduct(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
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
router.delete("/:id", async (req, res) => {
  try {
    await productsService.deleteProduct(req.params.id);

    res
      .status(204)
      .json({
        status: "success",
        data: { message: "Successfully deleted product!" },
      });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", data: { message: getErrorMessage(err) } });
  }
});

module.exports = router;
