const User = require("../Model/user_model");

const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password, address, phone, role } =
      req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(200).json({ message: "email already exist" });
    }

    const newUSer = await User.create({
      firstname,
      lastname,
      email,
      password,
      address,
      phone,
      role,
    });

    res.status(200).json({
      message: "registration successful",
      token: await newUSer.generateToken(),
      userId: newUSer._id.toString(),
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(402).json({ message: "invalid email or password" });
    }

    const compare = userExist.comparePassword(password);
    if (compare) {
      res.status(200).json({
        user: userExist,
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    }
  } catch (error) {}
};

const user = async (req, res) => {
  try {
    const user = req.user;
    console.log("🚀 ~ user ~ user:", user);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = { register, login, user };
