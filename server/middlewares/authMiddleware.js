const jwt = require("./../lib/jwt");
const SECRET = require("./../config/secret");
const { checkIfAdmin } = require("../services/authService");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies["auth"];
  const adminToken = req.cookies["admin-auth"];

  if (!token) {
    return next();
  }

  if (!adminToken) {
    return next();
  }

  try {
    const decoded = await jwt.verify(token, SECRET);
    const adminDecoded = await jwt.verify(adminToken, SECRET);

    req.user = decoded;
    req.adminUser = adminDecoded;

    next();
  } catch (err) {
    next();
  }
};

const isAuth = (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ status: "fail", data: { message: "You must login!" } });
  }

  next();
};

const isAdmin = async (req, res, next) => {
  if(!await checkIfAdmin(req.user._id) && !req.adminUser) {
    return res
      .status(401)
      .json({ status: "fail", data: { message: "You are unauthorized for this action!" } });
  }

  next();
}

module.exports = {
  authMiddleware,
  isAuth,
  isAdmin,
};
