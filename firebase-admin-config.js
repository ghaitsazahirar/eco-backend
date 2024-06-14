const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

const firebaseConfig = {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ecowise-47f54-default-rtdb.asia-southeast1.firebasedatabase.app"
};

admin.initializeApp(firebaseConfig);

const db = admin.firestore();
const database = admin.database();

module.exports = { db, database };
