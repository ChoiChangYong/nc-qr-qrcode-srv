var Qrcode = require('../services').Qrcode;
var Token = require('../services').Token;

/**
 * QR코드 생성
 */
exports.createQrcode = (req, res, next) => {
    const secret = req.app.get('jwt-secret');
    Qrcode.create((url) => {
        Token.create(url, secret, (callback) => {
            res.json({
                result: 1,
                qrcode: callback.url+'%3Fqr_token%3D'+callback.token+'&apn=com.example.qrcodelogin'
            });
        });
    });
};

/**
 * QR코드 토큰 검증
 */
exports.checkQrcodeToken = (req, res, next) => {
    const secret = req.app.get('jwt-secret');
    const request = {
        token: req.body.qr_token
    }
    if(request.token){
        Token.validate(request.token, secret, (callback) => {
            if(callback){
                res.json({result: 1});
            } else {
                res.json({result: 0});
            }
        });
    } else {
        console.log("/qrcode-token/validation (POST) : no token");
        res.json({result: 0});
    }
};