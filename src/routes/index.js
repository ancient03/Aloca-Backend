const express = require('express');
const router = express.Router();

const healthController = require('../controllers/healthController');
const helloController = require('../controllers/helloController');
const loginController = require('../controllers/loginController');
const databaseController = require("../controllers/databaseController");
const profileController = require("../controllers/profileController");
const { verifyToken } = require("../middlewares/authMiddleware");
const registerController = require("../controllers/registerController");
const kantongController = require(
  "../controllers/kantongController"
);
const transaksiController = require(
  "../controllers/transaksiController"
);

router.get('/health', healthController.checkHealth);
router.get('/hello', helloController.getHello);
router.get('/login', (req, res) => {
  res.json({
    message: "Use POST /api/login"
  });
});
router.post('/login', loginController.login);
router.get("/db-test", databaseController.testDb);
router.get(
  "/profile",
  verifyToken,
  profileController.profile
);
router.post(
  "/register",
  registerController.register
);

//kantong
router.post(
  "/kantong",
  verifyToken,
  kantongController.createKantong
);

router.get(
  "/kantong",
  verifyToken,
  kantongController.getKantong
);

router.get(
  "/kantong/:id",
  verifyToken,
  kantongController.getKantongById
);

router.put(
  "/kantong/:id",
  verifyToken,
  kantongController.updateKantong
);

router.delete(
  "/kantong/:id",
  verifyToken,
  kantongController.deleteKantong
);

//transaksi
router.post(
  "/transaksi",
  verifyToken,
  transaksiController.createTransaksi
);

router.get(
  "/transaksi",
  verifyToken,
  transaksiController.getTransaksi
);
module.exports = router;