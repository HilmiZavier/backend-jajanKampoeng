const TransactionModel = require("../models/transactionModel");
const ProductModel = require("../models/productModel"); // Wajib import ini untuk cek harga

// 1. GET ALL
const getAllTransactions = async (req, res) => {
  try {
    const data = await TransactionModel.getAllTransactions();
    res.json({
      message: "GET all transactions success",
      data: data,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error", serverMessage: error.message });
  }
};

// 2. CREATE TRANSACTION
const createTransaction = async (req, res) => {
  try {
    const { id_user, id_product, jumlah, metode_pembayaran } = req.body;

    // Validasi input dasar
    if (!id_user || !id_product || !jumlah || !metode_pembayaran) {
      return res.status(400).json({ message: "Data tidak lengkap!" });
    }

    // STEP 1: Ambil data produk dulu untuk tahu HARGANYA
    // (Kita pakai try-catch khusus di sini untuk handle jika produk tidak ada)
    let product;
    try {
      product = await ProductModel.getProductById(id_product);
    } catch (err) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    // STEP 2: Hitung Total Harga di Backend
    const total_harga = product.price * jumlah;

    // STEP 3: Simpan Transaksi
    const data = await TransactionModel.createTransaction(
      id_user,
      id_product,
      jumlah,
      total_harga,
      metode_pembayaran,
    );

    res.status(201).json({
      message: "Transaksi berhasil dibuat",
      data: data,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error", serverMessage: error.message });
  }
};

// 3. UPDATE STATUS (Pending -> Success/Cancelled)
const updateStatusTransaction = async (req, res) => {
  try {
    const { id } = req.params; // id_transaksi
    const { status } = req.body;

    // Validasi input status harus sesuai ENUM
    const allowedStatus = ["pending", "success", "cancelled"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Status salah! Pilih: pending, success, atau cancelled",
      });
    }

    // Cek dulu apakah transaksi ada
    const existingTx = await TransactionModel.getTransactionById(id);
    if (!existingTx) {
      return res.status(404).json({ message: "Transaksi tidak ditemukan" });
    }

    // Lakukan update
    await TransactionModel.updateStatus(id, status);

    res.json({
      message: "Update status berhasil",
      data: {
        id_transaksi: id,
        status_baru: status,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error", serverMessage: error.message });
  }
};

module.exports = {
  getAllTransactions,
  createTransaction,
  updateStatusTransaction,
};
