// Core modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const admin = require('firebase-admin');

// Cloudstore config
let serviceAccount = require('./private/serviceAccountKey.json');
if (process.env.PORT) serviceAccount = process.env.SERVICE_ACCOUNT_KEY;
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

console.log("WHAT IS THE DB", db);

// Express config
const app = express();
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
app.use(bodyParser.json({limit: '1mb'}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.urlencodedParser = bodyParser.urlencoded({ extended: false });

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
const devURL = process.env.devURL;
const prodSecretURL = process.env.PORT ? process.env.prodSecretURL : fs.readFileSync(`${__dirname}/private/webhook.txt`).toString();
const prodRealURL = process.env.prodRealURL;
app.webhookURL = prodSecretURL;

// Set questions
app.qs = require('./questions/qs-1.js');

gameInit(app);
