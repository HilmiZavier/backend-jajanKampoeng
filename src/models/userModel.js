require("dotenv").config();
const dbPool = require("../config/database");
const getAllUser = async () => {
  const SQLquery = `SELECT id,name,username,email,role,images,created_at,updated_at FROM user`;
  const [rows] = await dbPool.query(SQLquery);
  return rows;
};
const getUserById = async (id) => {
  const SQLquery = `SELECT id,name,username,email,role,created_at,updated_at FROM user WHERE id = ${id}`;
  const [rows] = await dbPool.query(SQLquery);

  if (rows.length === 0) {
    throw new Error(`User with id ${id} not found`);
  }
  return rows;
};

const createUser = async (name, username, email, role, password) => {
  const SQLquery = `INSERT INTO user (name,username,email,role,password) VALUES (?,?,?,?,?)`;
  const [rows] = await dbPool.query(SQLquery, [
    name,
    username,
    email,
    role,
    password,
  ]);
  return {
    id: rows.insertId,
    name: name,
    username: username,
    email: email,
    role: role,
  };
};
const updateUser = async (name, username, email, role, password) => {
  const SQLquery = `UPDATE user SET (name,username,email,role,password) VALUES (?,?,?,?,?) WHERE id = ${id}`;
  const [rows] = await dbPool.query(SQLquery, [
    name,
    username,
    email,
    role,
    password,
  ]);
  return {
    id: id,
    name: name,
    username: username,
    email: email,
    role: role,
    data: rows,
  };
};
const deleteUser = async (name, username, email, role, password) => {
  const user = await getUserById(id);
  if (!user) {
    throw new Error(`User with id ${id} not found`);
  }
  const SQLquery = `DELETE FROM user WHERE id = ${id}`;
  const [rows] = await dbPool.query(SQLquery);
  return {
    id: id,
    data: rows.affectedRows,
  };
};

const uploadImage = async (images) => {
  const SQLquery = `UPDATE user SET images = ? WHERE id = ${id}`;
  const [rows] = await dbPool.query(SQLquery, [images]);
  return {
    id: rows.insertId,
    images: process.env.URL + images,
    data: rows.affectedRows,
  };
};

const getUserByIdentifier = async (identifier) => {
  const SQLquery = `SELECT * FROM user WHERE username = ? OR email = ?`;
  const [rows] = await dbPool.query(SQLquery, [identifier, identifier]);
  return rows[0];
};

module.exports = {
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  uploadImage,
  getUserByIdentifier,
};
