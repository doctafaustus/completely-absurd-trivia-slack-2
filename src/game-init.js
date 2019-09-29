// Game components
const Game = require('./constructors/game-constructor.js');
const nextQuestion = require('./core-components/next-question.js');
const getLeaderboard = require('./leaderboard/get-leaderboard.js');

// Actions
const joinGame = require('./actions/join-game.js');
const questionGuess = require('./actions/question-guess');

// Messages
const newGameMessage = require('./messages/new-game-message.js');

// Helpers
const checkAdmin = require('./helpers/check-admin.js');
const sendMessageToSlack = require('./helpers/send-message-to-slack.js');

// Map actions functions to their slack IDs
const actionMap = {
  'join-game': joinGame,
  'question_guess': questionGuess
};


module.exports = function gameInit(app) {

  // Command: Create new game
  app.post('/new-game', app.urlencodedParser, checkAdmin, (req, res) => {
    console.log('/new-game');
    res.status(200).end();
  
    app.game = new Game();
    sendMessageToSlack(app.webhookURL, newGameMessage());
  });

  // Command: Start game
  app.post('/start-game', app.urlencodedParser, checkAdmin, (req, res) => {
    console.log('/start-game');
    res.status(200).end();

    if (!app.game || !app.game.users || !app.game.users.length || app.game.gameEnded) {
      return sendMessageToSlack(req.body.response_url, { text: 'Users must join first before starting game' });
    }

    const playerList = app.game.users.map((user, index) => {
      return `\`${index + 1})\` ${user.name}`;
    }).join('\n');

    sendMessageToSlack(app.webhookURL, { text: `All set! :completely-absurd-trivia: _Game starts in 5 seconds..._\n>:family: *Contestants:*\n${playerList}` });

    setTimeout(() => {
      nextQuestion(app);
    }, 2000);
  });


  // Command: Stop game
  app.post('/stop-game', app.urlencodedParser, checkAdmin, (req, res) => {
    console.log('/stop-game');
    res.status(200).end();

    if (app.game) {
      app.game.stopped = true;
      sendMessageToSlack(app.webhookURL, { text: 'Game cancelled' });
    }
  });


  // Handle all user actions
  app.post('/actions', app.urlencodedParser, (req, res) => {
    console.log('/actions');
    res.status(200).end();
  
    const actionJSONPayload = JSON.parse(req.body.payload);
    actionMap[actionJSONPayload.callback_id](app, actionJSONPayload);
  });


  app.post('/leaderboard', app.urlencodedParser, checkAdmin, (req, res) => {
    console.log('/leaderboard');
    res.status(200).end();

    getLeaderboard(app);
  });


  // Broadcast
  app.post('/broadcast', app.urlencodedParser, checkAdmin, (req, res) => {
    console.log('/broadcast');
    res.status(200).end();

    sendMessageToSlack(app.webhookURL, {
      'attachments': [
        {
          'pretext': req.body.text,
          'color': '#e20ec7',
        }
      ]
    });
  });


  // Game alert
  app.post('/game-alert', app.urlencodedParser, checkAdmin, (req, res) => {
    console.log('/game-alert');
    res.status(200).end();
  
    const splitMessage = req.body.text.split('+');
    let formattedMessage = '';
    splitMessage.forEach(item => {
      formattedMessage += `${item.trim()}\n`;
    });
  
    sendMessageToSlack(app.webhookURL, {
      'attachments': [
        {
          'pretext': '<!channel> :megaphone: *Game Alert* :siren:\n',
          'color': '#f24308',
          'text': formattedMessage,
          'mrkdwn_in': ['text', 'pretext']
        }
      ]
    });
  });

}