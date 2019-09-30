module.exports = class User {

  constructor(user) {
    this.name = user;
    this.score = 0;
    this.answerText = null;
    this.answerName = 'no answer';
    this.wasCorrect = false;
    this.hasWon = false;
    this.perfectGame = false;
  }

}