module.exports = function newGameMessage() {
  return {
    'attachments': [
      {
        'text': `A new game has been created! :speak_no_evil: \nWho would like to play?`,
        'callback_id': 'join_game',
        'color': '#03ec42',
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
  }
}