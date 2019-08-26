const http = require('http');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const { serverKey, reciverKey } = require('./keys');

admin.initializeApp();

module.exports.setPostDate = functions.database.ref('/messages/{id}').onCreate((snapshot, context) => {
    const data = snapshot.val();

    data.date = new Date().toISOString();

    snapshot.ref.set(data).then(() => {
        http.request({
            host: 'fcm.googleapis.com',
            path: '/fcm/send',
            method: 'POST',
            headers: {
                'Authorization': `key=${serverKey}`,
                'Content-Type': 'application/json'
            }
        }).end(JSON.stringify({
            data: data,
            to: reciverKey
        }));
    }).catch(error => {
        console.error('Failed to add date when creating message: ', error)
    });
});
