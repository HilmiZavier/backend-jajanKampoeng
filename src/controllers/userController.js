const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const getAllUser = async (_req, res) => {
  try {
    const user = await userModel.getAllUser();

    res.status(200).json({
      message: "Success get all data user",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      serverMessage: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.getUserById(id);

    res.status(200).json({
      message: "Success get data user with id " + id,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      serverMessage: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, username, email, role, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.createUser(
      name,
      username,
      email,
      role,
      hashedPassword
    );

    res.status(201).json({
      message: "Success create user",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      serverMessage: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, username, email, role, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.updateUser(
      id,
      name,
      username,
      email,
      role,
      hashedPassword
    );

    res.status(200).json({
      message: "Success update user",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      serverMessage: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await userModel.deleteUser(id);

    res.status(200).json({
      message: "Success delete user",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      serverMessage: error.message,
    });
  }
};

const uploadImage = async (req, res) => {
  try {
    const images = req.file ? req.file.filename : null;
    const data = await userModel.uploadImage(id, images);

    res.status(200).json({
      message: "Image uploaded successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      serverMessage: error.message,
    });
  }
};

module.exports = {
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  uploadImage,
};
