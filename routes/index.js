var express = require('express');
var router = express.Router();
var qrlogin = require('../controllers/qrlogin');

/* GET QR-Code */
router.get('/qrcode/:instanceId', qrlogin.createQrcode);

/* POST validate QR token (Auth Server -> this) */
router.post('/session/verification', qrlogin.verifyQrcodeSession);

/* DELETE QR-Code session (Web Server -> this) */
router.delete('/sessions/:sessionID', qrlogin.deleteQrcodeSession);

module.exports = router;
