const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

module.exports.setPostDate = functions.database.ref('/messages/{id}').onCreate((snapshot, context) => {
    const data = snapshot.val();

    data.date = new Date().toISOString();

    snapshot.ref.set(data).catch(error => {
        console.error('Failed to add date when creating message: ', error)
    });
});
