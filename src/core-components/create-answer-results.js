module.exports = function createAnswerResults(app, correctAnswer) {

	const gameEnded = (app.game.currentQuestion === app.questions.length) ? true : false;

	let resultText;
  const correctUsers = [];
  
	app.game.users.forEach(user => {
		if (user.wasCorrect) correctUsers.push(user.name);
	});

	if (!correctUsers.length) {
    resultText = 'No one got it right. :shame:'
	} else if (correctUsers.length === 1) {
    resultText = `Only *${correctUsers[0]}* got it right! :wow:`;
	} else {
    resultText = `${correctUsers.join(', ')} got it right!`;
  }

	if (!gameEnded) {
		resultText += '\n _Next question in 8 seconds..._';
	}

	// Sort users by score
	app.game.users.sort((a, b) => {
		return b.score - a.score;
	});

	const playerList = app.game.users.map(user => {
		const guessedAnswer = user.answerName;
		return `     *${user.score}* ${user.name} _(${guessedAnswer})_`;
	}).join('\n');
 
  const title = (!app.gameEnded) ? '>*Leaderboard:*' : '>*GAME ENDED! - FINAL RESULTS:*';
  const message = {
    text: `*Answer:* \`${correctAnswer}\`\n${resultText}\n${title}\n${playerList}`
  };

  return message;
  
}