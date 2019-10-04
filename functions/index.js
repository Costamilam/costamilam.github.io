const functions = require('firebase-functions');
const admin = require('firebase-admin');

let receiver;

admin.initializeApp();

admin.database().ref('/receiver').on('value', snapshot => receiver = snapshot.val());

module.exports.onCreateMessage = functions.database.ref('/messages/{id}').onCreate((snapshot, context) => {
    const data = snapshot.val();

    data.date = new Date().toISOString();

    return snapshot.ref.set(data).then(() => {
        notify(data);
    }).catch(error => {
        console.error('Failed to add date when creating message: ', error)
    });
});

const notify = function(data) {
    if (receiver) {
        admin.messaging().send({
            data: data,
            token: receiver
        });
    } else {
        setTimeout(() => notify(data), 500);
    }
}
