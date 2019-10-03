const cTable = require('console.table');

module.exports = function leaderboardMessage(users) {

  return {
    text: `*All Time Leaders* :trophy:\n\n \`\`\`${cTable.getTable(users)}\`\`\``
  };

}