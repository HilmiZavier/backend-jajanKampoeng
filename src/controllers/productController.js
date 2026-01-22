const ProductModel = require("../models/productModel");

// 1. GET ALL PRODUCTS
const getAllProducts = async (req, res) => {
  try {
    const data = await ProductModel.getAllProducts();
    res.json({
      message: "GET all products success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message,
    });
  }
};

// 2. GET PRODUCT BY ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await ProductModel.getProductById(id);
    res.json({
      message: "GET product success",
      data: data,
    });
  } catch (error) {
    // Jika errornya karena tidak ketemu (sesuai logic di Model)
    if (error.message.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message,
    });
  }
};

// 3. CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const { name_product, jenis, price, stock } = req.body;

    // Tangkap file jika ada, jika tidak set null
    const images = req.file ? req.file.filename : null;

    if (!name_product || !jenis || !price || !stock) {
      return res.status(400).json({ message: "Field wajib diisi!" });
    }

    // Kirim images ke Model
    const data = await ProductModel.createProduct(
      name_product,
      jenis,
      price,
      stock,
      images,
    );

    res.status(201).json({
      message: "CREATE product success",
      data: data,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error", serverMessage: error.message });
  }
};

// 4. UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name_product, jenis, price, stock } = req.body;

    // Cek apakah ada file baru?
    const images = req.file ? req.file.filename : null;

    // Cek produk ada/tidak
    await ProductModel.getProductById(id);

    // Kirim ke model
    const data = await ProductModel.updateProduct(
      id,
      name_product,
      jenis,
      price,
      stock,
      images,
    );

    res.json({
      message: "UPDATE product success",
      data: data,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error", serverMessage: error.message });
  }
};

// 5. DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Cek dulu
    await ProductModel.getProductById(id);

    const data = await ProductModel.deleteProduct(id);
    res.json({
      message: "DELETE product success",
      data: data,
    });
  } catch (error) {
    if (error.message.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
