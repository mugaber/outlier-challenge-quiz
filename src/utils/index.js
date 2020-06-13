/**
 * @param {Array} The array to shuffle
 * @returns {Array} Returns the new shuffled array
 */

function shuffleAnswers (answers) {
  const result = [...answers]

  let currentIndex = result.length
  let temporaryValue
  let randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    temporaryValue = result[currentIndex]
    result[currentIndex] = result[randomIndex]
    result[randomIndex] = temporaryValue
  }

  return result
}

/**
 * @param {Object} Containing number of questions answered, correct answers count
 * and the questions length
 * @returns {Object} Containing the current score, max score and min score.
 */

function calculateNewScore ({
  answeredQuestionsCount,
  correctAnswersCount,
  QUESTIONS_LENGTH
}) {
  if (
    QUESTIONS_LENGTH <= 0 ||
    correctAnswersCount < 0 ||
    answeredQuestionsCount < 0
  ) return null

  const currentScore =
    answeredQuestionsCount < 1
      ? 0
      : (correctAnswersCount * 100) / answeredQuestionsCount

  const maxScore =
    ((QUESTIONS_LENGTH - answeredQuestionsCount + correctAnswersCount) * 100) /
    QUESTIONS_LENGTH

  const minScore = (correctAnswersCount * 100) / QUESTIONS_LENGTH

  return { currentScore, maxScore, minScore }
}

export { shuffleAnswers, calculateNewScore }
