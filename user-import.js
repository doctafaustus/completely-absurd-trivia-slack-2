// Import scores as of 10/2/19

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


const users = [
  {
    points: 148,
    username:  'nick',
    wins: 2,
    goldJackets: 0
  },
  {
    points: 270,
    username: 'kevinalbright',
    wins: 9,
    goldJackets: 3
  },
  {
    points: 164,
    username: 'haleymc',
    wins: 1,
    goldJackets: 0
  },
  {
    points: 178,
    username: 'bdf',
    wins: 4,
    goldJackets: 0
  },
  {
    points: 214,
    username: 'adam',
    wins: 5,
    goldJackets: 2
  },
  {
    points: 109,
    username: 'jlowe',
    wins: 2,
    goldJackets: 0
  },
  {
    points: 72,
    username: 'marcus',
    wins: 2,
    goldJackets: 0
  },
  {
    points: 119,
    username: 'joebumbulis',
    wins: 2,
    goldJackets: 0
  },
  {
    points: 82,
    username: 'jackie',
    wins: 1,
    goldJackets: 0
  },
  {
    points: 103,
    username: 'jessica',
    wins: 1,
    goldJackets: 0
  },
  {
    points: 120,
    username: 'dante',
    wins: 1,
    goldJackets: 0
  },
  {
    points: 227,
    username: 'john.rong',
    wins: 2,
    goldJackets: 1
  },
  {
    points: 152,
    username: 'joco',
    wins: 1,
    goldJackets: 0
  },
  {
    points: 82,
    username: 'libby',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 37,
    username: 'elizabeth',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 186,
    username: 'joshpyn',
    wins: 4,
    goldJackets: 1
  },
  {
    points: 232,
    username: 'mitch',
    wins: 2,
    goldJackets: 0
  },
  {
    points: 128,
    username: 'molly',
    wins: 1,
    goldJackets: 0
  },
  {
    points: 221,
    username: 'autumn',
    wins: 6,
    goldJackets: 0
  },
  {
    points: 128,
    username: 'chelsb',
    wins: 1,
    goldJackets: 0
  },
  {
    points: 99,
    username: 'troy',
    wins: 2,
    goldJackets: 0
  },
  {
    points: 221,
    username: 'joshua.jalaliani',
    wins: 5,
    goldJackets: 2
  },
  {
    points: 172,
    username: 'devon',
    wins: 1,
    goldJackets: 0
  },
  {
    points: 9,
    username: 'catherine.chiodo',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 22,
    username: 'catherine',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 136,
    username: 'carolyn',
    wins: 4,
    goldJackets: 0
  },
  {
    points: 70,
    username: 'shannon',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 169,
    username: 'marion',
    wins: 5,
    goldJackets: 1
  },
  {
    points: 71,
    username: 'tomhanlon',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 41,
    username: 'jenni',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 16,
    username: 'abby',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 172,
    username: 'tylerneusty',
    wins: 6,
    goldJackets: 1
  },
  {
    points: 212,
    username: 'mercan',
    wins: 4,
    goldJackets: 1
  },
  {
    points: 125,
    username: 'darice',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 66,
    username: 'taylor',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 27,
    username: 'brendan',
    wins: 1,
    goldJackets: 0
  },
  {
    points: 121,
    username: 'westrhodes',
    wins: 3,
    goldJackets: 0
  },
  {
    points: 157,
    username: 'seangardner',
    wins: 2,
    goldJackets: 0
  },
  {
    points: 222,
    username: 'james',
    wins: 4,
    goldJackets: 1
  },
  {
    points: 144,
    username: 'couv',
    wins: 5,
    goldJackets: 0
  },
  {
    points: 88,
    username: 'billy',
    wins: 2,
    goldJackets: 0
  },
  {
    points: 186,
    username: 'geoffk',
    wins: 7,
    goldJackets: 1
  },
  {
    points: 87,
    username: 'mark',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 15,
    username: 'glynn',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 3,
    username: 'tomi',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 18,
    username: 'ricalaley',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 133,
    username: 'brady',
    wins: 2,
    goldJackets: 0
  },
  {
    points: 43,
    username: 'ryang',
    wins: 2,
    goldJackets: 0
  },
  {
    points: 82,
    username: 'ryanabelman',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 90,
    username: 'kendra',
    wins: 3,
    goldJackets: 0
  },
  {
    points: 13,
    username: 'ashley',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 38,
    username: 'adrienne',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 12,
    username: 'dan.cardamone',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 81,
    username: 'kellee',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 83,
    username: 'cara.daniels',
    wins: 1,
    goldJackets: 0
  },
  {
    points: 85,
    username: 'jane',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 28,
    username: 'aaron',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 83,
    username: 'jeremylindsley',
    wins: 2,
    goldJackets: 0
  },
  {
    points: 131,
    username: 'sarah.santa.cruz',
    wins: 2,
    goldJackets: 0
  },
  {
    points: 75,
    username: 'andrew',
    wins: 1,
    goldJackets: 0
  },
  {
    points: 11,
    username: 'jake',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 6,
    username: 'kristen',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 4,
    username: 'easy-e',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 4,
    username: 'azia.c.foster',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 10,
    username: 'caitlin.checkett',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 93,
    username: 'phillip.quintero',
    wins: 2,
    goldJackets: 0
  },
  {
    points: 3,
    username: 'drew',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 60,
    username: 'anjali.satyu',
    wins: 2,
    goldJackets: 0
  },
  {
    points: 17,
    username: 'jenn',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 2,
    username: 'brandon.thorly',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 3,
    username: 'a.michelle.adams',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 57,
    username: 'archana.jayakumar',
    wins: 1,
    goldJackets: 0
  },
  {
    points: 38,
    username: 'melissa',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 113,
    username: 'lynn.a.hunt',
    wins: 1,
    goldJackets: 0
  },
  {
    points: 7,
    username: 'chris',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 7,
    username: 'scarlett.r.sidwell',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 20,
    username: 'ed_tomalin',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 18,
    username: 'joelle.m.baldacci',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 24,
    username: 'lauren.walker',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 43,
    username: 'joshua.norris',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 34,
    username: 'juan.b.reyes',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 3,
    username: 'adrian.vargas',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 2,
    username: 'elizabeth.damiano',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 4,
    username: 'franck.b.hoffmann',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 27,
    username: 'colby.riggle',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 6,
    username: 'brandon.j',
    wins: 0,
    goldJackets: 0
  },
  {
    points: 12,
    username: 'nicholas.r.radcliffe',
    wins: 0,
    goldJackets: 0
  }
];


const batch = db.batch();
users.forEach(user => {
  const ref = db.collection('leaderboard').doc(user.username);
  batch.set(ref, {
    points: user.points,
    username: user.username,
    wins: user.wins,
    goldJackets: user.goldJackets
  });
});

batch.commit().then(() => {
  console.log('Batch uploaded to DB');
});