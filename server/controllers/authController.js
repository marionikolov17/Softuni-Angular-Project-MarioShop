const router = require("express").Router();

const authService = require("./../services/authService");
const cartService = require("./../services/cartService");

const { isAuth, isAdmin } = require("./../middlewares/authMiddleware");

const { getErrorMessage } = require("./../utils/errorUtil");

router.get("/user", isAuth, async (req, res) => {
  //console.log(req.cookies)
  try {
    const user = await authService.getUser(req.user._id);

    res.status(200).json({
      status: "success",
      data: {
        user
      }
    })
  } catch (err) {
    res.status(500).json({
      status: "error",
      data: {
        message: "An error happened on the server!"
      }
    })
  }
})

router.get("/admin", isAdmin, async (req, res) => {
  //console.log(req.cookies)
  try {
    const user = await authService.getUser(req.adminUser._id);
    //console.log(user)

    res.status(200).json({
      status: "success",
      data: {
        user
      }
    })
  } catch (err) {
    res.status(500).json({
      status: "error",
      data: {
        message: "An error happened on the server!"
      }
    })
  }
})

router.post("/register", async (req, res) => {
  try {
    //console.log(req.body)
    const {token, createdUser} = await authService.registerUser(req.body);

    /* Create empty cart for user */
    await cartService.createCart({ userId: createdUser._id, products: [] });

    res.cookie("auth", token);
    res.status(201).json({
        status: "success",
        data: {
            token,
            createdUser
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
    const {user, token} = await authService.loginUser(req.body);

    if (user.isAdmin) {
      return res.status(401).json({
        status: "fail",
        data: {
          errorMessage: "Email or password are incorrect!"
        }
      })
    }

    res.cookie("auth", token);
    res.status(200).json({
        status: "success",
        data: {
            token,
            user
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

router.post("/admin-login", async (req, res) => {
  try {
    const {user, token} = await authService.loginUser(req.body);

    if (!user.isAdmin) {
      throw new Error("Email or password are incorrect!");
    }

    res.cookie("admin-auth", token);
    res.status(200).json({
        status: "success",
        data: {
            token,
            user
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
  res.status(200).json({
    status: "success",
    data: {
      message: "User successfully logout!"
    }
  })
});

router.get("/admin-logout", isAdmin, (req, res) => {
  res.clearCookie("admin-auth");
  res.status(200).json({
    status: "success",
    data: {
      message: "Admin successfully logout!"
    }
  })
});

module.exports = router;
