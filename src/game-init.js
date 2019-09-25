// Game components
const Game = require('./constructors/game-constructor.js');

// Actions
const joinGame = require('./actions/join-game.js');

// Messages
const newGameMessage = require('./messages/new-game-message.js');

// Helpers
const sendMessageToSlack = require('./helpers/send-message-to-slack.js');

// Map actions functions to their slack IDs
const actionMap = {
  'join-game': joinGame,
};


module.exports = function gameInit(app) {

  // Command: Create new game
  app.post('/new-game', app.urlencodedParser, (req, res) => {
    console.log('/new-game');
    res.status(200).end();
  
    app.game = new Game();
    sendMessageToSlack(app.webhookURL, newGameMessage());
  });


  // Command: Start game
  app.post('/start-game', app.urlencodedParser, (req, res) => {
    console.log('/start-game');
    res.status(200).end();

    if (!app.game || !app.game.users || !app.game.users.length || app.game.gameEnded) {
      return sendMessageToSlack(req.body.response_url, { text: 'Users must join first before starting game' });
    }

    let playerList = app.game.users.map((user, index) => {
      return `\`${index + 1})\` ${user.name}`;
    });
    playerList = playerList.join('\n');

    sendMessageToSlack(app.webhookURL, { text: `All set! :completely-absurd-trivia: _Game starts in 5 seconds..._\n>:family: *Contestants:*\n${playerList}` });
  });


  // Handle all user actions
  app.post('/actions', app.urlencodedParser, (req, res) => {
    console.log('/actions');
    res.status(200).end();
  
    const actionJSONPayload = JSON.parse(req.body.payload);
    actionMap[actionJSONPayload.callback_id](app, actionJSONPayload);
  });

}
