/* eslint-env browser, serviceworker, es6 */
'use strict';

// 대기상태에서, 서버가 메시지를 주면 여기서 받게된다.
self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`); // 서버가 보낸 메시지.

  const title = 'Push Codelab';
  const options = {
    body: 'Yay it works.',
    icon: 'images/icon.png',
    badge: 'images/badge.png',
    message: event.data.text()
  };

  event.waitUntil(self.registration.showNotification(title, options)); // 우측 하단에 표시될 내용.
});


// Register event listener for the 'push' event.
// self.addEventListener('push', function(event) {
//   // Keep the service worker alive until the notification is created.
// event.waitUntil(
//   // Show a notification with title 'ServiceWorker Cookbook' and body 'Alea iacta est'.
//   self.registration.showNotification('ServiceWorker Cookbook', {
//     body: 'Alea iacta est',
//   })
// );
// });