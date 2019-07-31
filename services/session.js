var models = require('../models');
var Session = models.Session;

/**
 * QR코드 세션 검증
 */
exports.verifyQrcodeSession = (qrcodeSessionID, callback) => {
    console.log('qrcodeSessionID : '+qrcodeSessionID);
    Session.findOne({
        where: { session_id: qrcodeSessionID }
    }).then(function(result) {
        callback(result);
    }).catch(function(err){
        console.log(err);
    });
}

/**
 * 세션 삭제
 */
exports.deleteSession = (sessionID, callback) => {
    Session.destroy({
        where: { session_id: sessionID }
    }).then(function(result) {
        callback(result);
    }).catch(function(err){
        console.log(err);
    });
};