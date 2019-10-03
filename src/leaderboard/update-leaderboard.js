const getLeaderboard = require('./get-leaderboard.js');

module.exports = function updateLeaderboard(app) {

  // Get all database users
  app.db.collection('leaderboard').get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();

      // If the user already exists, save their information to our object
      const user = app.game.users.find(user => user.name === data.username);
      if (user) {
        user.inDB = true;
        user.wins = (user.hasWon) ? data.wins + 1 : data.wins;
        user.points = user.score + data.points;
        user.goldJackets = (user.perfectGame) ? data.goldJackets + 1 : data.goldJackets;
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

    app.game.users.forEach(user => {
      const ref = app.db.collection('leaderboard').doc(user.name);
      batch.set(ref, {
        username: user.name,
        wins: user.inDB ? user.wins : (user.hasWon ? 1: 0),
        points: user.inDB ? user.points : user.score,
        goldJackets: user.inDB ? user.goldJackets : (user.perfectGame ? 1 : 0)
      });
    });

    batch.commit().then(() => {
      getLeaderboard(app);
    });
    
  }
}