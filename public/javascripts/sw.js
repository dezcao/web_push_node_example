/* eslint-env browser, serviceworker, es6 */
'use strict';

// 대기상태에서, 서버가 메시지를 주면 여기서 받아서 처리된다.
self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`); // 서버가 보낸 메시지.

  const title = 'Push Codelab';
  const options = {
    body: 'Yay it works.',
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options)); // 우측 하단에 표시될 내용.
});
