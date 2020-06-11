import questions from './questions.json'

const questionsLength = questions.length

export const ACTION_TYPES = {
  INCREMENT_QUESTION_INDEX: 'INCREMENT_QUESTION_INDEX',
  INCREMENT_ANSWERED_QUESTIONS: 'INCREMENT_ANSWERED_QUESTIONS',
  INCREMENT_CORRECT_ANSWERS: 'INCREMENT_CORRECT_ANSWERS',
  UPDATE_SCORE: 'UPDATE_SCORE',
  FINISH_QUIZ: 'FINISH_QUIZ',
  ANOTHER_QUIZ: 'ANOTHER_QUIZ'
}

export const INITIAL_STATE = {
  questionIndex: 0,
  answeredQuestionsCount: 0,
  correctAnswersCount: 0,
  currentScore: 0,
  maxScore: 100,
  minScore: 0,
  quizFinished: false
}

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.INCREMENT_QUESTION_INDEX:
      return { ...state, questionIndex: state.questionIndex + 1 }

    case ACTION_TYPES.INCREMENT_ANSWERED_QUESTIONS:
      return {
        ...state,
        answeredQuestionsCount: state.answeredQuestionsCount + 1
      }

    case ACTION_TYPES.INCREMENT_CORRECT_ANSWERS:
      return { ...state, correctAnswersCount: state.correctAnswersCount + 1 }

    case ACTION_TYPES.UPDATE_SCORE:
      return {
        ...state,
        currentScore:
          (state.correctAnswersCount * 100) / state.answeredQuestionsCount,

        maxScore:
          ((questionsLength -
            (state.answeredQuestionsCount - state.correctAnswersCount)) *
            100) /
          questionsLength,

        minScore: (state.correctAnswersCount * 100) / questionsLength
      }

    case ACTION_TYPES.FINISH_QUIZ:
      return { ...state, quizFinished: true }

    case ACTION_TYPES.ANOTHER_QUIZ:
      return INITIAL_STATE

    default:
      return state
  }
}
