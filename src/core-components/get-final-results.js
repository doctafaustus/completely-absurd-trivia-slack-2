module.exports = function getFinalResults(app) {

  const highestScore = app.game.users.reduce((accum, item) => {
    if (item.score > accum) return item.score
    else return accum;
  }, 0);

  let perfectScoreObtained = false;
  const winners = app.game.users.filter(user => {
    if (user.score === app.questions.length) perfectScoreObtained = true;
    return user.score === highestScore;
  }).map(user => `<@${user.name}>`);

  let text;
  if (perfectScoreObtained) {
    text = `Congratulations ${winners.join(', ')} - *PERFECT SCORE* :trophy: :completely-absurd-trivia: :trophy:`;
  } else {
    text = `Congratulations ${winners.join(', ')}! :party-wizard:`;
  }

  return { text };

}