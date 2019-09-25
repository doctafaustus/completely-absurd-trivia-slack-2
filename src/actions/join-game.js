// Game components
const User = require('../constructors/user-constructor.js');

// Helpers
const sendMessageToSlack = require('../helpers/send-message-to-slack.js');


module.exports = function joinGame(app, actionJSONPayload) {

  const username = actionJSONPayload.user.name;

  if (!app.game) return;

  // See if user is already in game
  if (app.game.getUser(username)) {
    return sendMessageToSlack(actionJSONPayload.response_url, { 
      text: 'You\'re in the game already!',
      replace_original: false,
      response_type: 'ephemeral'
    });
  }

  // Push user into game's user list
  app.game.users.push(new User(username));
  console.log(app.game);
  sendMessageToSlack(app.webhookURL, { text: `_${username} is in!_` });

}