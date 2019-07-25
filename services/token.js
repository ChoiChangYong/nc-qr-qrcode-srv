const jwt = require('jsonwebtoken');

/**
 * QR코드 토큰 생성
 */
exports.create = (url, secret, callback) => {
    const token = jwt.sign(
        {
            url
        }, 
        secret, 
        {
          algorithm: 'HS512',
          // expiresIn: 60 * 60 * 24 * 7
          expiresIn: 30 // 30초
        }
      )
      callback({
          url:url,
          token:token
      });
};

/**
 * QR코드 토큰 유효성 검증
 */
exports.validate = (token, secret, callback) => {
    try {
        const decoded = jwt.verify(token, secret);
        console.log("/qrcode-token/validation (POST) : token is verify");
        console.log(decoded);
        callback(true);
    } catch(err) {
        console.log("/qrcode-token/validation (POST) : token is not verify");
        callback(false);
    }
};