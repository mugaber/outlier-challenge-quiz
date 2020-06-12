function shuffleAnswers(answers) {
  let answersCopy = [...answers]

  let currentIndex = answersCopy.length,
    temporaryValue,
    randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    temporaryValue = answersCopy[currentIndex]
    answersCopy[currentIndex] = answersCopy[randomIndex]
    answersCopy[randomIndex] = temporaryValue
  }

  return answersCopy
}

function calculateNewScore({
  answeredQuestionsCount,
  correctAnswersCount,
  QUESTIONS_LENGTH
}) {
  if (
    QUESTIONS_LENGTH <= 0 ||
    correctAnswersCount < 0 ||
    answeredQuestionsCount < 0
  )
    return null

  const currentScore =
    answeredQuestionsCount < 1
      ? 0
      : (correctAnswersCount * 100) / answeredQuestionsCount

  const maxScore =
    ((QUESTIONS_LENGTH - (answeredQuestionsCount - correctAnswersCount)) *
      100) /
    QUESTIONS_LENGTH

  const minScore = (correctAnswersCount * 100) / QUESTIONS_LENGTH

  return { currentScore, maxScore, minScore }
}

export { shuffleAnswers, calculateNewScore }
