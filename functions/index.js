const functions = require('firebase-functions');
const admin = require('firebase-admin');

let receiver;

admin.initializeApp();

admin.database().ref('/receiver').on('value', snapshot => receiver = snapshot.val());

module.exports.setPostDate = functions.database.ref('/messages/{id}').onCreate((snapshot, context) => {
    const data = snapshot.val();

    data.date = new Date().toISOString();

    return snapshot.ref.set(data).then(() => {
        admin.messaging().send({
            data: data,
            token: receiver
        });
    }).catch(error => {
        console.error('Failed to add date when creating message: ', error)
    });
});
