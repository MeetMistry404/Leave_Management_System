const jwt = require("jsonwebtoken");
const User = require("../Model/user_model");

const userMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    res.status(400).json({ message: "unaurthorized user" });
  }

  const jwToken = token.replace("Bearer", "").trim();

  try {
    const isVerified = jwt.verify(jwToken, process.env.SECRET_KRY);

    const userVerified = await User.findOne({ email: isVerified.email }).select(
      { password: 0 }
    );

    req.user = userVerified;
    req.token = token;
    req.userId = userVerified._id;

    next();
  } catch (error) {
    res.status(200).json({ message: "internal server error" });
  }
};

module.exports = userMiddleware;
