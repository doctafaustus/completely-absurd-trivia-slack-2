module.exports = function createAnswerResults(app, correctAnswer, isBeardTriv) {

  let allOrNoneText = '';
  let nextQuestionText = '';
  const correctUsers = [];
  
  app.game.users.forEach(user => {
    if (user.wasCorrect) correctUsers.push(user.name);
  });

  const ratio = `${correctUsers.length}/${app.game.users.length}`;
  const percentage = `${Math.round((correctUsers.length / app.game.users.length) * 100)}`;
  const resultSummary = `\`${ratio} (${percentage}%)\``;

  if (!correctUsers.length) {
    allOrNoneText = 'No one got it right. :doh: \n';
  } else if (correctUsers.length === 1) {
    allOrNoneText = `Only *${correctUsers[0]}* got it right! :wow: \n`;
  } else if (correctUsers.length === app.game.users.length) {
    allOrNoneText = 'Everyone got it right! :aw-yeah: \n';
  } else allOrNoneText = '\n';

  if (!app.game.ended) {
    nextQuestionText = '_Next question in 10 seconds..._';
  }

  // Sort users by score
  app.game.users.sort((a, b) => {
    return b.score - a.score;
  });

  const playerList = app.game.users.map(user => {
    const guessedAnswer = (user.answerName === null) ? 'no answer' : user.answerName;
    const correctBold = user.wasCorrect ? '*' : '';
    return `     *${user.score}* ${correctBold}${user.name} _(${guessedAnswer})_${correctBold}`;
  }).join('\n');
 
  const title = (app.game.ended) ? '>*GAME ENDED! - FINAL RESULTS:*' : '>*Leaderboard:*';

  let message;
  if (!isBeardTriv) {
    message = {
      text: `*Answer:* \`\`\`${correctAnswer}\`\`\`\n${resultSummary} ${allOrNoneText} ${nextQuestionText}\n\n\n${title}\n${playerList}`
    };
  } else {
    message = {
      "blocks": [
        {
          'type': 'divider',
          'block_id': 'divider1'
        }
      ],
      'attachments': [
        {
          'type': 'image',
          'image_url': app.qs.questions[app.game.currentQuestion].beardRevealImg
        },
        {
          'text': `*Answer:* \`\`\`${correctAnswer}\`\`\`\n${resultSummary} ${allOrNoneText} ${nextQuestionText}\n\n\n${title}\n${playerList}`
        }
      ]
    };
  }

  return message;
}