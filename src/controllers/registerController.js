const pool = require("../config/database");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const [existingUser] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        message: "Email sudah digunakan",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    await pool.query(
      `
      INSERT INTO users
      (username, email, password_hash)
      VALUES (?, ?, ?)
      `,
      [username, email, hashedPassword]
    );

    res.status(201).json({
      status: "success",
      message: "User berhasil dibuat",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  register,
};