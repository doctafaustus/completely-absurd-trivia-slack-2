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
const devURL = process.env.devURL;
const prodSecretURL = process.env.PORT ? process.env.prodSecretURL : fs.readFileSync(`${__dirname}/private/webhook.txt`).toString();
const prodRealURL = process.env.prodRealURL;
app.webhookURL = prodSecretURL;

// Set questions
app.qs = require('./questions/qs-1.js');

gameInit(app);


const users = [
  {
    username: 'Ted',
    hasWon: true,
    points: 1,
  }, {
    username: 'Bob',
    hasWon: false,
    points: 8,
  },
  {
    username: 'Jamie',
    hasWon: true,
    points: 111,
  },
  {
    username: 'RalphieB',
    hasWon: true,
    points: 3,
  },
];

// Get all database users
app.db.collection('leaderboard').get()
  .then((snapshot) => {
    snapshot.forEach(doc => {
      const data = doc.data();

      // If the user already exists, save their information to our object
      const user = users.find(user => user.username === data.username);
      if (user) {
        user.inDB = true;
        user.wins = (user.hasWon) ? data.wins + 1 : data.wins;
        user.points = user.points + data.points;
      }
    });

    updateUsers();
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });


// Batch update the DB with our updated object
function updateUsers() {
  const batch = app.db.batch();

  users.forEach(user => {
    const ref = app.db.collection('leaderboard').doc(user.username);
    batch.set(ref, {
      username: user.username,
      wins: user.inDB ? user.wins : (user.hasWon ? 1: 0),
      points: user.points
    });
  });

  batch.commit();
}



