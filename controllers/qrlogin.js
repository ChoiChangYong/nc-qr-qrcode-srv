var Qrcode = require('../services').Qrcode;
var Session = require('../services').Session;

/**
 * QR코드 생성
 */
exports.createQrcode = async (req, res, next) => {
    const request = {
        instanceId: req.params.instanceId
    }

    const createQRStringResult = await Qrcode.createQRString();
    // QR코드 세션 생성
    req.session.instanceId = request.instanceId;
    req.session.save(() => {
        res.json({
            result: 1,
            qrcode: createQRStringResult+'%3Fkey%3D'+req.sessionID+'&apn=com.example.qrcodelogin'
        });
    });
};

/**
 * QR코드 토큰 검증
 */
exports.verifyQrcodeSession = async (req, res, next) => {
    const request = {
        qrcodeSessionID: req.body.qrcodeSessionID
    }
    
    if(!request.qrcodeSessionID){
        return res.json({result: 0, message: "QR코드 세션이 존재하지 않습니다."});
    }

    const verifyQrcodeSessionResult = await Session.verifyQrcodeSession(request.qrcodeSessionID);
    
    if(verifyQrcodeSessionResult==null){
        return res.json({result: 0, message: "세션이 만료되었습니다.\n다시 로그인해주세요!"});
    }
    
    res.json({result: 1, qrcodeSession: verifyQrcodeSessionResult});
};

/**
 * QR코드 세션 삭제
 */
exports.deleteQrcodeSession = async (req, res, next) => {
    const request = {
        sessionID: req.params.sessionID
    }

    if(!request.sessionID){
        return res.json({result: 0, message: "QR코드 세션이 존재하지 않습니다."});
    } 

    const deleteSessionResult = await Session.deleteSession(request.sessionID);
    
    if(deleteSessionResult==0){
        return res.json({result: 1, message: "QR코드 세션이 존재하지 않습니다."});
    } else if(deleteSessionResult!=1){
        return res.json({result: 0, message: "세션 삭제 실패! 삭제된 row 개수:"+deleteSessionResult});
    }

    res.json({result: 1, message: "세션 삭제 성공"});
};
