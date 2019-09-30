const evaluateAnswers = require('../core-components/evaluate-answers.js');
const createAnswerResults = require('../core-components/create-answer-results.js');
const resetAnswers = require('../core-components/reset-answers.js');
const getFinalResults = require('../core-components/get-final-results.js');
const sendMessageToSlack = require('../helpers/send-message-to-slack.js');
const questionMessage = require('../messages/question-message.js');
const updateLeaderboard = require('../leaderboard/update-leaderboard.js');

module.exports = function nextQuestion(app) {
  if (app.game.stopped) return;

  const message = questionMessage(app);
  sendMessageToSlack(app.webhookURL, message);
  
  setTimeout(() => {
    if (app.game.ended || app.game.stopped) return console.log('Not evaluating answers - game has stopped');

    // Evaluate answers
    const correctAnswerText = evaluateAnswers(app);

    // Post results and reset answers
    sendMessageToSlack(app.webhookURL, createAnswerResults(app, correctAnswerText));

    // Send next question or send final results
    if (app.game.ended) {

      setTimeout(() => {
        const finalResults = getFinalResults(app);
        sendMessageToSlack(app.webhookURL, finalResults);
        updateLeaderboard(app);
      }, 2000);

    } else {

      setTimeout(() => {
        resetAnswers(app);
        nextQuestion(app);
      }, 3000);

    }
  }, 6000);

}
