const evaluateAnswers = require('../core-components/evaluate-answers.js');
const createAnswerResults = require('../core-components/create-answer-results.js');
const resetAnswers = require('../core-components/reset-answers.js');
const sendMessageToSlack = require('../helpers/send-message-to-slack.js');

module.exports = function nextQuestion(app) {
	if (app.game.stopped) return;

	const questionObj = app.questions[app.game.currentQuestion];

  var message = {
    'attachments': [
      {
        'text': `*${app.game.currentQuestion + 1}/${app.questions.length}*: ${questionObj.question}`,
        'callback_id': 'question_guess',
        'color': '#fd00af',
        'attachment_type': 'default',
        'actions': [
          {
            'name': questionObj.a,
            'text': questionObj.a,
            'type': 'button',
            'value': 'a'
          },
          {
            'name': questionObj.b,
            'text': questionObj.b,
            'type': 'button',
            'value': 'b'
          },
          {
            'name': questionObj.c,
            'text': questionObj.c,
            'type': 'button',
            'value': 'c'
          },
          {
            'name': questionObj.d,
            'text': questionObj.d,
            'type': 'button',
            'value': 'd'
          }
        ]
      }
    ]
  };

  sendMessageToSlack(app.webhookURL, message);
  
	setTimeout(() => {
    // Evaluate answers
    const correctAnswerText = evaluateAnswers(app);

    // Post results and reset answers
    sendMessageToSlack(app.webhookURL, createAnswerResults(app, correctAnswerText));
    resetAnswers(app);

    // Send next question
    setTimeout(() => {
      nextQuestion(app);
    }, 4000); 
  }, 6000);

}