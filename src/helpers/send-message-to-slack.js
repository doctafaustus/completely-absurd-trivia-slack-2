const request = require('request');

module.expots = function sendMessageToSlack(responseURL, JSONmessage) {
  var postOptions = {
    uri: responseURL,
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    json: JSONmessage
  };

  request(postOptions, (error, response, body) => {
    if (error) throw error;
  });
}