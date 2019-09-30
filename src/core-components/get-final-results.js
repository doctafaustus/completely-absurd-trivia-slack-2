module.exports = function getFinalResults(app) {

  const highestScore = app.game.users.reduce((accum, item) => {
    if (item.score > accum) return item.score
    else return accum;
  }, 0);

  let perfectScoreObtained = false;
  const winners = app.game.users.filter(user => {
    if (user.score === app.qs.questions.length) {
      user.perfectGame = true;
      perfectScoreObtained = true;
    }
    return user.score === highestScore;
  }).map(user => {
    user.hasWon = true;
    return `<@${user.name}>`;
  }).join(', ');

  let text;
  if (perfectScoreObtained) {
    text = `:trophy: :completely-absurd-trivia: :trophy: *Congratulations* ${winners} - *PERFECT SCORE!* \n _Your gold jacket has been shipped!_ :gold-jacket:  :gold_star_for_you: :gold-jacket:  :gold_star_for_you: :gold-jacket:`;
  } else {
    text = `*Congratulations* ${winners}! :party-wizard:`;
  }

  return { text };

}