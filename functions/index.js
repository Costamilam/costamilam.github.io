const functions = require('firebase-functions');
const admin = require('firebase-admin');

let receiver;

admin.initializeApp();

admin.database().ref('/receiver').on('value', snapshot => receiver = snapshot.val());

module.exports.onCreateMessage = functions.database.ref('/messages/{id}').onCreate((snapshot, context) => {
    const data = snapshot.val();

    data.date = new Date().toISOString();

    return snapshot.ref.set(data).then(() => {
        notify('New client message', data);
    }).catch(error => {
        notify('Failed to add date when creating message', { error, data });

        console.error('Failed to add date when creating message: ', error)
    });
});

module.exports.onError = functions.database.ref('/errors/{id}').onCreate((snapshot, context) => {
    notify('Error on create message', snapshot.val());
});

const notify = function(title, data) {
    if (receiver) {
        admin.messaging().send({
            data: { title, data: JSON.stringify(data) },
            token: receiver
        });
    } else {
        setTimeout(() => notify(title, data), 500);
    }
}
