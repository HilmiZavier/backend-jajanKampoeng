const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const user = await userModel.getUserByIdentifier(identifier);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.APP_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      message: "Successfully logged in",
      data: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        token: token,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      serverMessage: "Login User Error: " + error.message,
    });
  }
};

module.exports = {
  loginUser,
};
