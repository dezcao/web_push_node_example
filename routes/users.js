var express = require('express');
var router = express.Router();
var push = require('web-push');
var path = require('path');
var { readFile, writeFile } = require('node:fs/promises');

/* GET users listing. */
router.get('/vapidPublicKey', function(req, res, next) {
  console.log(process.env.VAPID_PUBLICKEY) // 키를 요청하면 공개키를 내려준다. app.js에서 처리해 두었음. 키 없으면 만들거나 있으면 json에 저장하고 있다가 프로세스에 끼움
  res.send(process.env.VAPID_PUBLICKEY);
});

// 유저가 푸시 서비스 구독을 신청하면서 자신의 정보를 보내옴.
router.post('/register',async function(req, res, next) {
	const subscription = req.body.subscription // 유저의 브라우저가 생성한것인데 서버가 해당 브라우저 찾기위해 저장해놓아야 한다
	const email = req.body.email // 나는 유저를 식별하기 위해 이메일 항목을 추가로 받겠음.

	// {{ database 대신에 파일을 사용함.
		const filePath = path.join(process.env.ROOT, 'subscriptions.json');
		const contents = await readFile(filePath, { encoding: 'utf8' });
		let subs = {}
		if (contents) {
			subs = JSON.parse(contents);
		}
		
		// subscription.expirationTime = 24

		subs[email] = subscription
		await writeFile(filePath, JSON.stringify(subs));
	// }}
	
	// PushManager.subscribe() 는 브라우저가 스스로 엔드포이트, 키를 생성.
	// 섭스크립션의 대충 생긴 모양. 참고용(브라우저에서 만든걸 전달 받도록 한다)
	// subscription = {
	// 	endpoint: "http://.../브라우저식별토큰",
	// 	keys: {
	// 		// 위 endpoint인 브라우저와 몰래 통신을 할건데, 암호화 해서 통신하기위한 키를 줘야 한다.
	// 		p256dh: '.....',
	// 		auth: '.....'
	// 	},
	// 	expirationTime: null
	// };

	// 샘플이므로 파일로 저장한다
	res.send(200);
});




// 서버관리자가 메시지를 발송하려함. 저장된 유저 섭스크립션을 꺼내서 대상유저에게 보낸다.
router.get('/:email/:payload', async function(req, res, next) {
	const {email, payload} = req.params
	
	const filePath = path.join(process.env.ROOT, 'subscriptions.json');
	const contents = await readFile(filePath, { encoding: 'utf8' });
	let subs = {}
	if (contents) {
		subs = JSON.parse(contents);
	}
	const pushSubscription = subs[email]
	
	const parsedUrl = new URL(pushSubscription.endpoint);
	const audience = parsedUrl.protocol + '//' + parsedUrl.hostname;
	const vapidHeaders = push.getVapidHeaders(
		audience,
		'mailto: example@web-push-node.org',
		process.env.VAPID_PUBLICKEY,
		process.env.VAPID_PRIVATEKEY,
		'aes128gcm'
	);

	const options = {
		// gcmAPIKey: '< GCM API Key >',
		vapidDetails: {
			subject: 'mailto: example@web-push-node.org',
			publicKey: process.env.VAPID_PUBLICKEY,
			privateKey: process.env.VAPID_PRIVATEKEY,
		},
		TTL: 0,
		headers: vapidHeaders
		// contentEncoding: 'aes128gcm'
	}

	try {
		// 'Headers' is an invalid option. The valid options are ['headers', 'gcmAPIKey', 'vapidDetails', 'TTL', 'contentEncoding', 'proxy', 'agent', 'timeout'].
		if (pushSubscription) {
			console.log(pushSubscription)
			push.setVapidDetails('mailto:test@code.co.uk', process.env.VAPID_PUBLICKEY, process.env.VAPID_PRIVATEKEY);
			push.sendNotification(pushSubscription, 'test');
			// push.sendNotification(pushSubscription, payload, {
			// 	headers: vapidHeaders
			// });
		}
	} catch (err) {
		console.error(err);
	}
	
	res.send(`call message : ${req.params.message}`);
});

module.exports = router;
