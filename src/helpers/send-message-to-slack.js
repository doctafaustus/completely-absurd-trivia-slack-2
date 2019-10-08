const request = require('request');

module.exports = function sendMessageToSlack(responseURL, JSONmessage) {
  const postOptions = {
    uri: responseURL,
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    json: JSONmessage
  };

  request(postOptions, (error, response, body) => {
    if (error) {
      console.log(`ERROR! - ${JSONmessage}`);
      console.log(`Error response - ${response}`);
      throw error;
    }
  });
}