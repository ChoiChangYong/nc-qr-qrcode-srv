/**
 * QR코드 URL 생성
 */
exports.createQRString = () => {
    return new Promise(resolve => { 
        //'http://pingauth.com/qrlogin'
        const url = 'https://pingauth.page.link/?link=http%3A%2F%2Fpingauth.com%2Fqrlogin';
        resolve(url);
    });
};
