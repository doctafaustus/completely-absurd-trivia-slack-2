const leaderboardMessage = require('../messages/leaderboard-message.js');
const sendMessageToSlack = require('../helpers/send-message-to-slack.js');

module.exports = function getLeaderboard(app) {

  let users = [];

  app.db.collection('leaderboard').get()
  .then((snapshot) => {
    snapshot.forEach(doc => {
      const data = doc.data();
      users.push(data);
    });

    sortUsersByWins();
    formatUserArray();

    const message = leaderboardMessage(users);
    sendMessageToSlack(app.webhookURL, message);
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });


  function sortUsersByWins() {
    users.sort((a, b) => {
      return b.wins - a.wins;
    });
  }

  // Define specify property order for table display
  function formatUserArray() {
    users = users.map(user => {
      return {
        'Wins': user.wins,
        'Player': user.username,
        'Total Points': user.points
      };
    });
  }

  
}
