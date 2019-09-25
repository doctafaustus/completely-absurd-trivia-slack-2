module.exports = function newGameMessage() {
  return {
    'attachments': [
      {
        'text': `:speak_no_evil: A new game has been created! \n*Who would like to play?*`,
        'callback_id': 'join-game',
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