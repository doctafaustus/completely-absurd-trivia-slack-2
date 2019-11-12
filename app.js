// Core modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const admin = require('firebase-admin');

// Cloudstore config
let serviceAccount = process.env.SERVICE_ACCOUNT_KEY;
if (!process.env.PORT) {
  serviceAccount = require('./private/serviceAccountKey.json');
} else {
  serviceAccount = JSON.parse(serviceAccount);
}
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();


// Express config
const app = express();
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
app.use(bodyParser.json({limit: '1mb'}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.urlencodedParser = bodyParser.urlencoded({ extended: false });
app.db = db;

// Game initializaiton
const gameInit = require('./src/game-init.js');

// Listen on port 4390
app.listen(process.env.PORT || 4390, () => {
  console.log('App listening on port 4390');
});


// Set test route
app.get('/', (req, res) => {
  console.log('Testing ping to server!');
  res.sendStatus(200);
});


// Webhook URLs
const prodSecretURL = process.env.PORT ? process.env.prodSecretURL : fs.readFileSync(`${__dirname}/private/webhook.txt`).toString();
const catv2URL = process.env.catv2URL
const prodRealURL = process.env.prodRealURL;
app.webhookURL = prodSecretURL;

// Set questions
app.qs = require('./questions/qs-mustaches-images.js');

gameInit(app);
