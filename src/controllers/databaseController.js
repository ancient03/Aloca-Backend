// src/controllers/databaseController.js

const pool = require("../config/database");

const testDb = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");

    res.json(rows);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = { testDb };