navigator.serviceWorker.register('service-worker.js');

if (!localStorage['list']) {
    localStorage['list'] = '[]'

    var list = [];
} else {
    var list = JSON.parse(localStorage['list']);
}

const main = document.querySelector('main');

function updateDOM() {
    main.innerHTML = '';

    for (let i = 0; i < list.length; i++) {
        const container = document.createElement('div');

        container.innerHTML = `
            <h1>${list[i].name}</h1>

            <p>${new Date(list[i].date).toLocaleString()}</p>

            ${list[i].phone ? `<p>${list[i].phone}</p>` : ''}

            ${list[i].email ? `<p>${list[i].email}</p>` : ''}
        `;

        const message = document.createElement('p');
        message.innerText = list[i].message;

        const button = document.createElement('button');
        button.innerText = 'Fechar';
        button.addEventListener('click', () => {
            exclude(i);
        });

        container.appendChild(message);
        container.appendChild(button);
        main.appendChild(container);
    }
}

function exclude(index) {
    list.splice(index, 1);

    localStorage['list'] = JSON.stringify(list);

    updateDOM();
}

updateDOM();

firebase.initializeApp({
    messagingSenderId: '399477884691'
});

const messaging = firebase.messaging();

let deviceToken = 'empty';

messaging.requestPermission()
    .then(() => {
        messaging.getToken().then(token => {
            document.querySelector('footer').innerText = token;

            deviceToken = token;
        }).catch(console.error);
    })
    .catch(console.error);

messaging.onMessage(function(payload) {
    list.push(payload.data);

    updateDOM();
});

document.querySelector('footer').addEventListener('click', () => {
    navigator.clipboard.writeText(deviceToken);
});
