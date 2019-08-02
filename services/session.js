var models = require('../models');
var Session = models.Session;

/**
 * QR코드 세션 검증
 */
exports.verifyQrcodeSession = (qrcodeSessionID) => {
    return new Promise(resolve => { 
        console.log('qrcodeSessionID : '+qrcodeSessionID);
        Session.findOne({
            where: { session_id: qrcodeSessionID }
        }).then(function(result) {
            resolve(result);
        }).catch(function(err){
            console.log(err);
        });
    });
}

/**
 * 세션 삭제
 */
exports.deleteSession = (sessionID) => {
    return new Promise(resolve => { 
        Session.destroy({
            where: { session_id: sessionID }
        }).then(function(result) {
            resolve(result);
        }).catch(function(err){
            console.log(err);
        });
    });
};