// Core modules
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const fs = require('fs');

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
  console.log('Testing ping to server');
  res.sendStatus(200);
});


// Webhook URLs
const devURL = process.env.devURL;
const prodSecretURL = process.env.PORT ? process.env.prodSecretURL : fs.readFileSync(`${__dirname}/private/webhook.txt`).toString();
const prodRealURL = process.env.prodRealURL;
app.webhookURL = prodSecretURL;

gameInit(app);



