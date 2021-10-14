var push = require('web-push')
// push.generateVAPIDKeys()
let vapidKeys = {
	publicKey: 'BEXxAexmq_kQpv3I6ZItzCWnI2NQ1h8WBakjUhje8Qnx-RHAve2gHA2IKKqjvgxXVLkhla1aJGGKNdGbbUxxbp4',
	privateKey: 'ARFp70A85U1E-F0eDxmE7RvGhddUE_3t1aRwhF1tIVs'
}

// 서비스할 사이트 주소를 적어야 한다. 아무거나 적었음.
push.setVapidDetails('mailto:test@code.co.uk', vapidKeys.publicKey, vapidKeys.privateKey);

let sub = { 
		"endpoint": "https://fcm.googleapis.com/fcm/send/e8JBosphmEA:APA91bFrxqauJxFjmbXGkwoqNezvzRTkuspkB6M41Ge3p7mgidjO1TRCi9QJ8-MoezBHOZMc_8xPDXaGFSgF0PhV6rA13VQh5mmGwouqCAXdjkuluYxGVuZnvO5EEy6t7bwzmRJMn2aa", 
		"expirationTime": null, 
		"keys": { 
					"p256dh": "BC7NNyezUbb8srYU-QRna-BC6UgYS0FlmssUoobPPU-Wav9p93j_Yv-x8DzvUbssSo5IqcqAafn760TW1RNwPKA", 
					"auth": "nYrA8QhuJZS3225k_CzigQ" 
				} 
	};
push.sendNotification(sub, 'test message');
