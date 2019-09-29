const sendMessageToSlack = require('../helpers/send-message-to-slack.js');


module.exports = function(app, actionJSONPayload) {

  if (!app.game) return console.log('No game active to handle player answer');

  const user = app.game.getUser(actionJSONPayload.user.name);
  if (!user) return console.log('User answered but is not in game');
  if (user.answerValue) return console.log('User already submitted answer');

  const userAnswerNum = Number(actionJSONPayload.actions[0].value.match(/\d+/)[0]);

  // If the user's answer number is not the same as the current question then return
  if (app.game.currentQuestion !== userAnswerNum) {
    user.answerName = 'no answer';
    return sendMessageToSlack(actionJSONPayload.response_url, { text: 'Too slow!', replace_original: false,
    response_type: 'ephemeral' });
  } 

  user.answerValue = actionJSONPayload.actions[0].value.match(/[a-d]/)[0];
  user.answerName = actionJSONPayload.actions[0].name;

  const message = {
    text: `_You answered *${actionJSONPayload.actions[0].name}*._`,
    replace_original: false,
    response_type: 'ephemeral'
  };

  sendMessageToSlack(actionJSONPayload.response_url, message);

}
