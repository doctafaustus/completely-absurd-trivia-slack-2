module.exports = function updateLeaderboard(app, users) {

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

}