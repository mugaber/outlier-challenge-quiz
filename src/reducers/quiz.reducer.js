import questions from '../questions.json'
import { calculateNewScore } from '../utils'

const ACTION_TYPES = {
  INCREMENT_QUESTION_INDEX: 'INCREMENT_QUESTION_INDEX',
  ANSWER_SELECTED: 'ANSWER_SELECTED',
  UPDATE_SCORE: 'UPDATE_SCORE',
  FINISH_QUIZ: 'FINISH_QUIZ',
  ANOTHER_QUIZ: 'ANOTHER_QUIZ'
}

const INITIAL_STATE = {
  QUESTIONS_LENGTH: questions.length,
  currentQuestion: questions[0],
  questionIndex: 0,
  isAnswerSelected: false,
  isAnswerCorrect: null,
  answeredQuestionsCount: 0,
  correctAnswersCount: 0,
  currentScore: 0,
  maxScore: 100,
  minScore: 0,
  isQuizFinished: false
}

function reducer (state, action) {
  const {
    QUESTIONS_LENGTH, questionIndex,
    correctAnswersCount, answeredQuestionsCount
  } = state

  switch (action.type) {
    case ACTION_TYPES.INCREMENT_QUESTION_INDEX:
      const newIndex = questionIndex + 1

      return {
        ...state,
        questionIndex: newIndex,
        isAnswerSelected: false,
        isAnswerCorrect: null,
        currentQuestion: questions[newIndex]
      }

    case ACTION_TYPES.ANSWER_SELECTED:
      const isAnswerCorrect = action.payload

      const newCorrectAnswersCount = isAnswerCorrect
        ? correctAnswersCount + 1
        : correctAnswersCount

      return {
        ...state,
        isAnswerSelected: true,
        isAnswerCorrect: isAnswerCorrect,
        correctAnswersCount: newCorrectAnswersCount,
        answeredQuestionsCount: answeredQuestionsCount + 1
      }

    case ACTION_TYPES.UPDATE_SCORE:
      const { currentScore, maxScore, minScore } = calculateNewScore({
        answeredQuestionsCount,
        correctAnswersCount,
        QUESTIONS_LENGTH
      })

      return { ...state, currentScore, maxScore, minScore }

    case ACTION_TYPES.FINISH_QUIZ:
      return { ...state, isQuizFinished: true }

    case ACTION_TYPES.ANOTHER_QUIZ:
      return INITIAL_STATE

    default:
      return state
  }
}

export { ACTION_TYPES, INITIAL_STATE, reducer }
