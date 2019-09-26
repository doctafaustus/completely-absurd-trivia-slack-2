module.exports = class User {
	constructor(user) {
		this.name = user;
		this.score = 0;
		this.answerValue = null;
		this.answerName = 'no answer';
		this.wasCorrect = false;
	}
}