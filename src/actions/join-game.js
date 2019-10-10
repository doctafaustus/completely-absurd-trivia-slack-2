// Game components
const User = require('../constructors/user-constructor.js');
const getOpener = require('../messages/get-opener.js');

// Helpers
const sendMessageToSlack = require('../helpers/send-message-to-slack.js');


module.exports = function joinGame(app, actionJSONPayload) {

  if (!app.game) return;
  if (app.game.ended || app.game.stopped) return console.log('Not joining - game has stopped');

  const username = actionJSONPayload.user.name;

  // See if user is already in game
  if (app.game.getUser(username)) {
    return sendMessageToSlack(actionJSONPayload.response_url, { 
      text: 'You\'re already in the game!',
      replace_original: false,
      response_type: 'ephemeral'
    });
  }

  // Push user into game's user list
  app.game.users.push(new User(username));

  let opener = getOpener();
  if (username === 'autumn') opener = 'is playing with wood';
  sendMessageToSlack(app.webhookURL, { text: `_${username} ${opener}_` });

}