const dbPool = require("../config/database");

// 1. AMBIL SEMUA TRANSAKSI (Dengan detail Nama User & Produk)
const getAllTransactions = async () => {
  const SQLquery = `
    SELECT 
      t.id_transaksi, 
      t.id_user,
      u.name AS nama_user,
      t.id_product,
      p.name_product,
      p.images AS gambar_product,
      t.jumlah, 
      t.total_harga, 
      t.metode_pembayaran, 
      t.status, 
      t.created_at
    FROM transactions t
    JOIN user u ON t.id_user = u.id
    JOIN products p ON t.id_product = p.id_product
    ORDER BY t.created_at DESC
  `;
  const [rows] = await dbPool.query(SQLquery);
  return rows;
};

// 2. AMBIL TRANSAKSI BERDASARKAN ID TRANSAKSI
const getTransactionById = async (id_transaksi) => {
  const SQLquery = `SELECT * FROM transactions WHERE id_transaksi = ?`;
  const [rows] = await dbPool.query(SQLquery, [id_transaksi]);
  return rows[0];
};

// 3. TAMBAH TRANSAKSI BARU
const createTransaction = async (
  id_user,
  id_product,
  jumlah,
  total_harga,
  metode_pembayaran,
) => {
  // Status default kita set 'pending' di sini (atau biarkan default database)
  const SQLquery = `
    INSERT INTO transactions (id_user, id_product, jumlah, total_harga, metode_pembayaran, status) 
    VALUES (?, ?, ?, ?, ?, 'pending')
  `;
  const [rows] = await dbPool.query(SQLquery, [
    id_user,
    id_product,
    jumlah,
    total_harga,
    metode_pembayaran,
  ]);

  return {
    id_transaksi: rows.insertId,
    id_user,
    id_product,
    jumlah,
    total_harga,
    metode_pembayaran,
    status: "pending",
  };
};

// 4. UPDATE STATUS TRANSAKSI
const updateStatus = async (id_transaksi, status) => {
  const SQLquery = `UPDATE transactions SET status = ? WHERE id_transaksi = ?`;
  const [rows] = await dbPool.query(SQLquery, [status, id_transaksi]);
  return rows.affectedRows;
};

module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateStatus,
};
