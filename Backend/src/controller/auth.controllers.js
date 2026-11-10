const userModel = require("../models/user.model");
const tokenBlackListModel = require("../models/tokenblacklist.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const isUserAlreadyExists = await userModel.findOne({
      email: email.trim().toLowerCase(),
    });

    if (isUserAlreadyExists) {
      return res.status(400).json({
        message: "User Already Exists with email or username",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hash,
    });

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User Register Successfuly",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      return res.status(400).json({
        message: "All fields are Required",
      });
    }

    const user = await userModel.findOne({ email: email.trim().toLowerCase() });

    if (!user) {
      return res.status(401).json({
        message: "email or password are invalid",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "User Login Successfuly",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function logoutUser(req, res) {
  try {
    const token = req.cookies.token;

    if (token) {
      await tokenBlacklistModel.create({ token });
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    return res.status(200).json({
      message: "User Logout Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function getme(req, res) {
  try {
    const id = req.user.id;

    const user = await userModel.findById(id);

    if(!user){
      return res.status(404).json({
        message:"User not found"
      })
    }

    return res.status(200).json({
      message: "User details fetched successfully",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getme
};
