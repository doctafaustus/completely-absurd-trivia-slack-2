const openers = require('./openers.js');

module.exports = function getOpener() {

  let opener = 'is in!';

  // if (openers.length) {
  //   const randomIndex = Math.floor(Math.random() * openers.length);
  //   opener = openers.splice(randomIndex, 1);
  // }

  return opener;

}