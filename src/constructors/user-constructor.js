module.exports = class User {
	constructor(user) {
		this.name = user;
		this.score = 0;
		this.answer = null;
		this.wasCorrect = false;
		this.answerName = 'no answer';
	}
}