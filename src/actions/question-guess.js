const sendMessageToSlack = require('../helpers/send-message-to-slack.js');


module.exports = function(app, actionJSONPayload) {

  if (!app.game) return console.log('No game active to handle player answer');

  const user = app.game.getUser(actionJSONPayload.user.name);
  if (!user) return console.log('User answered but is not in game');
  if (user.answerValue) return console.log('User already submitted answer');

  const currentQuestion = app.questions[app.game.currentQuestion];

  user.answerValue = actionJSONPayload.actions[0].value;
  user.answerName = actionJSONPayload.actions[0].name;

  // console.log({
  //   currentQuestion,
  //   'user.answerValue': user.answerValue,
  //   'user.answerName': user.answerName
  // });

  const message = {
    text: `_You answered *${actionJSONPayload.actions[0].name}*._`,
    replace_original: false,
    response_type: 'ephemeral'
  };

  sendMessageToSlack(actionJSONPayload.response_url, message);

}
