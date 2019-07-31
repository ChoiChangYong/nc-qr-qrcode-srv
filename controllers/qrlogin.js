var Qrcode = require('../services').Qrcode;
var Session = require('../services').Session;

/**
 * QR코드 생성
 */
exports.createQrcode = (req, res, next) => {
    const request = {
        instanceId: req.params.instanceId
    }

    Qrcode.createQRString((url) => {
        // QR코드 세션 생성
        req.session.instanceId = request.instanceId;
        console.log(req.session);
        req.session.save(() => {
            res.json({
                result: 1,
                qrcode: url+'%3Fkey%3D'+req.sessionID+'&apn=com.example.qrcodelogin'
            });
        });
    });
};

/**
 * QR코드 토큰 검증
 */
exports.verifyQrcodeSession = (req, res, next) => {
    const request = {
        qrcodeSessionID: req.body.qrcodeSessionID
    }

    if(request.qrcodeSessionID){
        Session.verifyQrcodeSession(request.qrcodeSessionID, (callback) => {
            if(callback!=null){
                res.json({result: 1, qrcodeSession: callback});
            } else {
                res.json({result: 0, message: "세션이 만료되었습니다.\n다시 로그인해주세요!"});
            }
        });
    } else {
        res.json({result: 0, message: "로그인 정보가 존재하지 않습니다."});
    }
};

/**
 * 유저 세션 삭제
 */
exports.deleteQrcodeSession = (req, res, next) => {
    const request = {
        sessionID: req.params.sessionID
    }

    if(request.sessionID){
        Session.deleteSession(request.sessionID, (callback) => {
            if(callback==1)
                res.json({result: 1, message: "세션 삭제 성공"});
            else
                res.json({result: 0, message: "세션 삭제 실패! 삭제된 row 개수:"+callback});
        });
    } else {
        res.json({result: 0, message: "유저 세션이 존재하지 않습니다."});
    }
};
