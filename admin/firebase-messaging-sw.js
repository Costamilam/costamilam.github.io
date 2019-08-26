importScripts('https://www.gstatic.com/firebasejs/4.13.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.13.0/firebase-messaging.js');

firebase.initializeApp({
    messagingSenderId: '399477884691'
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    localStorage['list'] = JSON.stringify(
        JSON.parse(localStorage['list']).concat(payload.data)
    );

    return self.registration.showNotification('Mensagem de Cliente', {
        body: payload.data.message,
        icon: '/icons/icon.png',
        data: {
            url: '/'
        }
    });
});