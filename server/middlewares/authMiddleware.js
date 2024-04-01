const jwt = require("./../lib/jwt");
const SECRET = require("./../config/secret");
const { checkIfAdmin } = require("../services/authService");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies["auth"];

  if (!token) {
    return next();
  }

  try {
    const decoded = await jwt.verify(token, SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    next();
  }
};

const adminMiddleware = async (req, res, next) => {
  const adminToken = req.cookies["admin-auth"];

  if (!adminToken) {
    //console.log("yes")
    return next();
  }

  try {
    const decoded = await jwt.verify(adminToken, SECRET);

    req.adminUser = decoded;

    next();
  } catch (err) {
    next();
  }
}

const isAuth = (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ status: "fail", data: { message: "You must login!" } });
  }

  next();
};

const isAdmin = async (req, res, next) => {
  if(!req.adminUser) {
    return res
      .status(401)
      .json({ status: "fail", data: { message: "You are unauthorized for this action!" } });
  }

  next();
}

module.exports = {
  authMiddleware,
  adminMiddleware,
  isAuth,
  isAdmin,
};
