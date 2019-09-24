// Game components
const Game = require('./constructors/game-contructor.js');
const User = require('./constructors/user-constructor.js');

// Messages
const newGameMessage = require('./messages/new-game-message.js');

// Helpers
const sendMessageToSlack = require('./helpers/send-message-to-slack.js');


module.exports = function gameInit(app) {
  let game;
  const user = new User('Bill');

  app.post('/new-game', app.urlencodedParser, (req, res) => {
    console.log('/new-game');
    res.status(200).end();
  
    game = new Game();
    sendMessageToSlack(app.webhookURL, {
    'attachments': [
      {
        'text': `A new game has been created! \nWho would like to play?`,
        'callback_id': 'join_game',
        'color': '#2ea664',
        'attachment_type': 'default',
        'actions': [
          {
            'name': 'me',
            'text': 'Me!',
            'type': 'button',
            'value': 'me',
            'style': 'primary'
          }
        ]
      }
    ]
  });
  });

}
