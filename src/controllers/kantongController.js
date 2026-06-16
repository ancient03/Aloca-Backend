const pool = require("../config/database");

const createKantong = async (req, res) => {
  try {
    const { nama, deskripsi, goal } = req.body;

    await pool.query(
      `
      INSERT INTO kantong
      (user_id, nama, deskripsi, goal)
      VALUES (?, ?, ?, ?)
      `,
      [
        req.user.id,
        nama,
        deskripsi,
        goal || 0,
      ]
    );

    res.status(201).json({
      status: "success",
      message: "Kantong berhasil dibuat",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getKantong = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT *
      FROM kantong
      WHERE user_id = ?
      `,
      [req.user.id]
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getKantongById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      `
      SELECT *
      FROM kantong
      WHERE id = ?
      AND user_id = ?
      `,
      [id, req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Kantong tidak ditemukan",
      });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const updateKantong = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, deskripsi, goal } = req.body;

    const [result] = await pool.query(
      `
      UPDATE kantong
      SET
        nama = ?,
        deskripsi = ?,
        goal = ?
      WHERE id = ?
      AND user_id = ?
      `,
      [
        nama,
        deskripsi,
        goal,
        id,
        req.user.id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Kantong tidak ditemukan",
      });
    }

    res.json({
      status: "success",
      message: "Kantong berhasil diupdate",
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const deleteKantong = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      `
      DELETE FROM kantong
      WHERE id = ?
      AND user_id = ?
      `,
      [
        id,
        req.user.id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Kantong tidak ditemukan",
      });
    }

    res.json({
      status: "success",
      message: "Kantong berhasil dihapus",
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  createKantong,
  getKantong,
  getKantongById,
  updateKantong,
  deleteKantong,
};