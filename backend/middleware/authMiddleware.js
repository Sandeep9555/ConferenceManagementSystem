const jwt = require("jsonwebtoken");
const user = require("../models/User");

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await user.findById(decode.id).select("-password");
  next();
};

const adminOnly = (req, res, next) => {
  if (!req.user.isAdmin) {
    res.status(403).json({ message: "Access denied, admin only" });
    next();
  }
};
module.exports = { protect, adminOnly };
