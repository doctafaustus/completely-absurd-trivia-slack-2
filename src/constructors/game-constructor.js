module.exports = class Game {

  constructor() {
    this.users = [];
    this.currentQuestion = 0;
    this.stopped = false;
    this.ended = false;
  }

  getUser(username) {
    return this.users.find(user => user.name === username);
  }
  
}
