var push = require('web-push')
// push.generateVAPIDKeys()
let vapidKeys = {
	publicKey: 'BEXxAexmq_kQpv3I6ZItzCWnI2NQ1h8WBakjUhje8Qnx-RHAve2gHA2IKKqjvgxXVLkhla1aJGGKNdGbbUxxbp4',
	privateKey: 'ARFp70A85U1E-F0eDxmE7RvGhddUE_3t1aRwhF1tIVs'
}

// 서비스할 사이트 주소를 적어야 한다. 아무거나 적었음.
push.setVapidDetails('mailto:test@code.co.uk', vapidKeys.publicKey, vapidKeys.privateKey);

let sub = {
	"endpoint":"https://fcm.googleapis.com/fcm/send/dhtTA53PfW8:APA91bEYfe07OwRoCFvWfIomf65zYxldywHSWwxI2_QJEzrcahDtoIlyzUxo3QmeN8_9-gKHe17im2EOYX6sJnLOQfAWHavHe5OCPJLs43_rrh7L2VUV2H4WdY9-HL5CREg6CtVQMMgJ"
	,"expirationTime":null
	,"keys":{"p256dh":"BCkPFFv9RUeI05mZr1a07SqoOK8FLSFiTq8iR9IM18hwtOozSRoMKYRgTAVCoiWbjoiSng6lt3uL9NqH68TPwCM"
	,"auth":"6dXkq_1lD4Tp9WQ3afiJDw"}};
push.sendNotification(sub, 'test message');
