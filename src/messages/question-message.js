module.exports = function questionMessage(app) {

  const questionObj = app.qs.questions[app.game.currentQuestion];
  console.log(`---------------------> Sending question: ${app.game.currentQuestion + 1}`);
  const message = {
    "blocks": [
      {
        'type': 'divider',
        'block_id': 'divider1'
      }
    ],
    'attachments': [
      {
        'text': `*${app.game.currentQuestion + 1}/${app.qs.questions.length}*: ${questionObj.question}`,
        'callback_id': 'question_guess',
        'color': '#fd00af',
        'attachment_type': 'default',
        'actions': [
          {
            'name': questionObj.a,
            'text': questionObj.a,
            'type': 'button',
            'value': `a${app.game.currentQuestion}`
          },
          {
            'name': questionObj.b,
            'text': questionObj.b,
            'type': 'button',
            'value': `b${app.game.currentQuestion}`
          },
          {
            'name': questionObj.c,
            'text': questionObj.c,
            'type': 'button',
            'value': `c${app.game.currentQuestion}`
          },
          {
            'name': questionObj.d,
            'text': questionObj.d,
            'type': 'button',
            'value': `d${app.game.currentQuestion}`
          }
        ]
      }
    ]
  };

  // Add additional image field for image game types
  if (app.qs.gameType === 'question') {
    const messageAttachment = message.attachments[0];
    messageAttachment.type = 'image';
    messageAttachment.image_url = questionObj.imageURL;
    messageAttachment.alt = questionObj.imageURL;
  }

  return message;
}