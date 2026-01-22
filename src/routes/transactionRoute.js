const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/transactionController");

// GET: Lihat semua history transaksi
router.get("/transactions", TransactionController.getAllTransactions);

// POST: User belanja (Bikin transaksi baru)
router.post("/transactions", TransactionController.createTransaction);

// PATCH: Admin update status (Misal dari pending ke success)
// Kita pakai PATCH karena cuma ubah 1 kolom (status)
router.patch(
  "/transactions/:id",
  TransactionController.updateStatusTransaction,
);

module.exports = router;
