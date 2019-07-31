var mysqlConfig = {
	debug: true,
	port: 3306,
	mysql: {
		// host: '127.0.0.1',
		host: '172.19.148.232',
		username: 'root',
		password: '8804',
		database: 'nc_qr_auth'
	}
}

var sessionExpireTime = 30*1000;   // 30초

module.exports = {
    'mysqlConfig': mysqlConfig,
    'sessionExpireTime': sessionExpireTime
}