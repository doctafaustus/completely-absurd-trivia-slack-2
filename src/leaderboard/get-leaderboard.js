const leaderboardMessage = require('../messages/leaderboard-message.js');
const sendMessageToSlack = require('../helpers/send-message-to-slack.js');

/*
Note that the Slack API can only support about 100 rows in the message's 
code block before it truncates it into multiple messages. Legacy players
should be deleted from the DB after 100 players have been reached or 
truncate long usernames.
*/
module.exports = function getLeaderboard(app) {

  let users = [];

  app.db.collection('leaderboard').get()
  .then((snapshot) => {
    snapshot.forEach(doc => {
      const data = doc.data();
      users.push(data);
    });

    sortUsers();
    formatUserArray();

    const message = leaderboardMessage(users);
    sendMessageToSlack(app.webhookURL, message);
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });


  // Sort users in this order: Wins > Points > Gold Jackets
  function sortUsers() {
    users.sort((a, b) => {
      return b.wins - a.wins || b.points - a.points || b.goldJackets - a.goldJackets;
    });
  }


  // Define specify property order for table display
  // NOTE: Keep column titles short to prevent truncation
  function formatUserArray() {
    users = users.map((user, index) => {
      return {
        'Rank': index + 1,
        'Player': user.username,
        'W': user.wins,
        'Pts': user.points,
        'GJ': user.goldJackets
      };
    });
  }

}
