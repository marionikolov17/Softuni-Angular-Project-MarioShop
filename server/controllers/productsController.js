const { isAuth, isAdmin } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/", isAuth, isAdmin, (req, res) => {
    res.json({ message: "OK" });
})

module.exports = router;