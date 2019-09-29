module.exports = function resetAnswers(app) {

  app.game.users.forEach(user => {
    user.wasCorrect = false;
    user.answerValue = null;
    user.answerName = null;
  });

}