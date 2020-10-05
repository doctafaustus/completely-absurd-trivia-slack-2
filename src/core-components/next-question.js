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

    // If beard game then show beard image
    console.log('What game?', app.qs.specialCategory);

    if (app.qs.specialCategory === 'beards') {
      console.log('showing beard result', app.qs.questions[app.game.currentQuestion].beardRevealImg);
      sendMessageToSlack(app.webhookURL, app.qs.questions[app.game.currentQuestion].beardRevealImg);
    } 

    // Post results and reset answers
    // sendMessageToSlack(app.webhookURL, createAnswerResults(app, correctAnswerText));

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
