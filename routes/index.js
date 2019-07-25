var express = require('express');
var router = express.Router();
var qrlogin = require('../controllers/qrlogin');

/* GET QR-Code */
router.get('/qrcode', qrlogin.createQrcode);

/* POST validate QR token (Auth Server -> this) */
router.post('/qrcode-token/validation', qrlogin.checkQrcodeToken);

module.exports = router;
