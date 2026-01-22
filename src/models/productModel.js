const dbPool = require("../config/database");

// 1. GET ALL PRODUCTS
const getAllProducts = async () => {
  const SQLquery = `SELECT id_product, name_product, jenis, price, stock, images, created_at, updated_at FROM products`;
  const [rows] = await dbPool.query(SQLquery);
  return rows;
};

// 2. GET PRODUCT BY ID
const getProductById = async (id_product) => {
  const SQLquery = `SELECT * FROM products WHERE id_product = ?`;
  const [rows] = await dbPool.query(SQLquery, [id_product]);
  if (rows.length === 0)
    throw new Error(`Product with id ${id_product} not found`);
  return rows[0];
};

// 3. CREATE PRODUCT
const createProduct = async (name_product, jenis, price, stock, images) => {
  const SQLquery = `INSERT INTO products (name_product, jenis, price, stock, images) VALUES (?, ?, ?, ?, ?)`;
  //                                          1          2      3      4      5               1  2  3  4  5

  const [rows] = await dbPool.query(SQLquery, [
    name_product,
    jenis,
    price,
    stock,
    images,
  ]);

  return {
    id_product: rows.insertId,
    name_product,
    jenis,
    price,
    stock,
    images,
  };
};

// 4. UPDATE PRODUCT
const updateProduct = async (
  id_product,
  name_product,
  jenis,
  price,
  stock,
  images,
) => {
  // Logic: Jika images kosong (user tidak upload baru), jangan update kolom images
  let SQLquery, values;

  if (images) {
    SQLquery = `UPDATE products SET name_product = ?, jenis = ?, price = ?, stock = ?, images = ? WHERE id_product = ?`;
    values = [name_product, jenis, price, stock, images, id_product];
  } else {
    SQLquery = `UPDATE products SET name_product = ?, jenis = ?, price = ?, stock = ? WHERE id_product = ?`;
    values = [name_product, jenis, price, stock, id_product];
  }

  const [rows] = await dbPool.query(SQLquery, values);

  return {
    id_product,
    name_product,
    jenis,
    price,
    stock,
    images,
    affectedRows: rows.affectedRows,
  };
};

// 5. DELETE PRODUCT
const deleteProduct = async (id_product) => {
  // Cek dulu apakah barangnya ada (opsional, biar error handling bagus)
  const product = await getProductById(id_product);

  const SQLquery = `DELETE FROM products WHERE id_product = ?`;
  const [rows] = await dbPool.query(SQLquery, [id_product]);

  return {
    id_product: id_product,
    message: "Deleted successfully",
    affectedRows: rows.affectedRows,
  };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
