const { Router } = require("express");
const { pool } = require("../config/database");

const router = Router();
router.get("/conn", async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS ok");
    res.json({
      ok: true,
      status: 200,
      dbmessage:
        rows[0].ok === 1 ? "Database connected" : "Database not connected",
    });
  } catch (error) {
    res.json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
});
module.exports = router;
