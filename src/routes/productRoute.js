const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");
const upload = require("../middleware/uploads/upload");

// --- GET (Read) ---
router.get("/products", ProductController.getAllProducts);
router.get("/products/:id", ProductController.getProductById);

// --- POST (Create) ---
// HANYA PAKAI SATU INI SAJA (Yang ada upload.single)
router.post(
  "/products",
  upload.single("images"),
  ProductController.createProduct,
);

// --- PUT (Update) ---
// HANYA PAKAI SATU INI SAJA (Yang ada upload.single)
router.put(
  "/products/:id",
  upload.single("images"),
  ProductController.updateProduct,
);

// --- DELETE ---
router.delete("/products/:id", ProductController.deleteProduct);

module.exports = router;
