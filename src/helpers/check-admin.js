const sendMessageToSlack = require('./send-message-to-slack.js');

module.exports = function checkAdmin(req, res, next) {
  console.log('req!', req.body.user_name);
	if (req.body.user_name.indexOf('billy') === -1) {
		res.status(200).end();
    const message = {
      'blocks': [
        {
          'type': 'section',
          'text': {
            'type': 'mrkdwn',
            'text': 'Ah ah ah! Only the admin can do that!'
          }
        },
        {
          'type': 'image',
          'title': {
            'type': 'plain_text',
            'text': 'newman',
            'emoji': true
          },
          'image_url': 'https://media.giphy.com/media/uIGfoVAK9iU1y/giphy.gif',
          'alt_text': 'newman'
        }
      ]
    }
  	sendMessageToSlack(req.body.response_url, message);
	} else {
		next();
	}
}
