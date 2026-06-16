const pool = require("../config/database");

const createTransaksi = async (req, res) => {
  try {
    const {
      kantong_id,
      jenis,
      nominal,
      keterangan
    } = req.body;

    await pool.query(
      `
      INSERT INTO transaksi
      (user_id, kantong_id, jenis, nominal, keterangan)
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        req.user.id,
        kantong_id,
        jenis,
        nominal,
        keterangan
      ]
    );

    if (jenis === "pemasukan") {
      await pool.query(
        `
        UPDATE kantong
        SET saldo = saldo + ?
        WHERE id = ?
        `,
        [nominal, kantong_id]
      );
    }

    if (jenis === "pengeluaran") {
      await pool.query(
        `
        UPDATE kantong
        SET saldo = saldo - ?
        WHERE id = ?
        `,
        [nominal, kantong_id]
      );
    }

    res.status(201).json({
      status: "success",
      message: "Transaksi berhasil dibuat"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const getTransaksi = async (req, res) => {
  try {

    const [rows] = await pool.query(
      `
      SELECT *
      FROM transaksi
      WHERE user_id = ?
      ORDER BY created_at DESC
      `,
      [req.user.id]
    );

    res.json(rows);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

module.exports = {
  createTransaksi,
  getTransaksi
};