module.exports = function evaluateAnswers(app) {

	if (!app.game || app.game.stopped) return console.log('Cannot evaluate answers: no game or game has stopped');

  const correctAnswer = app.questions[app.game.currentQuestion].answer;
  
	app.game.users.forEach(user => {
		if (user.answerValue === correctAnswer) {
			user.wasCorrect = true;
			user.score++;
		}
	});

  const correctAnswerText = app.questions[app.game.currentQuestion][correctAnswer];
  app.game.currentQuestion++;
  
  return correctAnswerText;

}