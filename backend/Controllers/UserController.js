const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const signupRoute = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await UserModel.findOne({ email });
    if (result) {
      return res.status(409).json({ message: "User already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is salt
    const User = new UserModel({ name, email, password: hashedPassword });
    await User.save();
    res.status(201).json({ message: "SignUp Successful", success: true });
  } catch (error) {
    console.log("Error during signup", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const loginRoute = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMsg = "Authentication faild email or password is wrong";
    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.status(200).json({
      message: "Login Successful",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (error) {
    console.log("Error during login", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

module.exports = { signupRoute, loginRoute };
