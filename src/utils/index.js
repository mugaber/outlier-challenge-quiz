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

export { shuffleAnswers }
