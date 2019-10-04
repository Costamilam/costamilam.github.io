importScripts('https://www.gstatic.com/firebasejs/4.13.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.13.0/firebase-messaging.js');

firebase.initializeApp({
    messagingSenderId: '399477884691'
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    return self.registration.showNotification(payload.data.title, {
        body: payload.data.data,
        icon: '/icons/icon.png',
        data: {
            url: '/'
        }
    });
});
