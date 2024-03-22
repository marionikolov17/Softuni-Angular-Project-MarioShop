const router = require("express").Router();

const authService = require("./../services/authService");

const { isAuth } = require("./../middlewares/authMiddleware");

const { getErrorMessage } = require("./../utils/errorUtil");

router.post("/register", async (req, res) => {
  try {
    console.log(req.body)
    const token = await authService.registerUser(req.body);

    res.cookie("auth", token);
    res.status(201).json({
        status: "success",
        data: {
            token
        }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      data: {
        errorMessage: getErrorMessage(err),
      },
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const token = await authService.loginUser(req.body);

    res.cookie("auth", token);
    res.status(200).json({
        status: "success",
        data: {
            token
        }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      data: {
        errorMessage: getErrorMessage(err),
      },
    });
  }
});

router.get("/logout", isAuth, (req, res) => {
  res.clearCookie("auth");
});

module.exports = router;
