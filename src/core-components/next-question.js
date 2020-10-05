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
  
  // Wait for users to guess
  setTimeout(() => {
    if (app.game.ended || app.game.stopped) return console.log('Not evaluating answers - game has stopped');

    // Evaluate answers
    const correctAnswerText = evaluateAnswers(app);

    // Post results and reset answers
    sendMessageToSlack(app.webhookURL, createAnswerResults(app, correctAnswerText, app.qs.specialCategory === 'beards'));

    // Send next question or send final results
    if (app.game.ended) {

      // Send congratulations message
      setTimeout(() => {
        const finalResults = getFinalResults(app);
        sendMessageToSlack(app.webhookURL, finalResults);
        if (app.webhookURL === process.env.prodRealURL) updateLeaderboard(app);
      }, 2000);

    } else {

      // Send next question
      setTimeout(() => {
        console.log('next question timeout');
        resetAnswers(app);
        nextQuestion(app);
      }, 8500);

    }
  }, 14000);

}
