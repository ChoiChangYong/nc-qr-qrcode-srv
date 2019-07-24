var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');

/* GET QR-Code */
router.get('/qrcode', function(req, res, next) {
  const secret = req.app.get('jwt-secret');
  const qrcode = {
    // qrcode: 'http://pingauth.com/qrlogin'
    qrcode: 'https://pingauth.page.link/?link=http%3A%2F%2Fpingauth.com%2Fqrlogin'
  }

  const tokenGenerator = (qrcode, callback) => {
    const token = jwt.sign(
      qrcode, 
      secret, 
      {
        algorithm: 'HS512',
        // expiresIn: 60 * 60 * 24 * 7
        expiresIn: 30 // 30초
      }
    )
    callback(token)
  }

  tokenGenerator(qrcode, function(qr_token){
    const decoded = jwt.verify(qr_token, secret);
    
    res.json({
      result: 1,
      qrcode: qrcode.qrcode+'%3Fqr_token%3D'+qr_token+'&apn=com.example.qrcodelogin'
    });
  });
});

/* POST validate QR token (Auth Server -> this) */
router.post('/qrcode-token/validation', function(req, res, next) {
  console.log("=============req.body.qr_token=============");
  console.log(req.body.qr_token);
  console.log("==============================");

  const token = {
    qr_token: req.body.qr_token
  }
  const secret = req.app.get('jwt-secret');

  if(token.qr_token){
    try {
      const decoded = jwt.verify(token.qr_token, secret);
      console.log("/qrcode-token/validation (POST) : token is verify");
      console.log(decoded);
      res.json({
        result: 1,
        message: "qrcode token is verify"
      });
    } catch(err) {
      console.log("/qrcode-token/validation (POST) : token is not verify");
      res.json({
        result: 0,
        message: "qrcode token is not verify"
      });
    }
  } else {
    console.log("/qrcode-token/validation (POST) : no token");
    res.json({
      result: 0,
      message: "no qrcode token"
    });
  }
});

module.exports = router;
