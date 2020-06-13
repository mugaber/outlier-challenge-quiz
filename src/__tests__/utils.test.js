import { shuffleAnswers, calculateNewScore } from '../utils'

describe('testing utility functions', () => {
  describe('testing shuffle answers functionality', () => {
    it('shuffle works with an empty array', () => {
      expect(shuffleAnswers([])).toStrictEqual([])
    })

    it('shuffle works with multiple elements', () => {
      const answers1 = [1, 2, 3, 4, 5]
      expect(shuffleAnswers(answers1)).not.toBe(answers1)

      const answers2 = ['one', 'two', 'three', 'four', 'five']
      expect(shuffleAnswers(answers2)).not.toBe(answers2)
    })
  })

  describe('testing calculate new score functionality', () => {
    it('new score with - params & 0 QUESTIONS_LENGTH', () => {
      const params1 = {
        answeredQuestionsCount: -1,
        correctAnswersCount: -1,
        QUESTIONS_LENGTH: -1
      }

      expect(calculateNewScore(params1)).toBe(null)

      const params2 = {
        answeredQuestionsCount: 10,
        correctAnswersCount: 10,
        QUESTIONS_LENGTH: 0
      }

      expect(calculateNewScore(params2)).toBe(null)
    })

    it('new score with + params, and a lot of cases', () => {
      const params1 = {
        answeredQuestionsCount: 0,
        correctAnswersCount: 0,
        QUESTIONS_LENGTH: 20
      }

      expect(calculateNewScore(params1)).toStrictEqual({
        currentScore: 0,
        minScore: 0,
        maxScore: 100
      })

      const params2 = {
        answeredQuestionsCount: 10,
        correctAnswersCount: 10,
        QUESTIONS_LENGTH: 20
      }

      expect(calculateNewScore(params2)).toStrictEqual({
        currentScore: 100,
        minScore: 50,
        maxScore: 100
      })

      const params3 = {
        answeredQuestionsCount: 10,
        correctAnswersCount: 5,
        QUESTIONS_LENGTH: 20
      }

      expect(calculateNewScore(params3)).toStrictEqual({
        currentScore: 50,
        minScore: 25,
        maxScore: 75
      })
    })
  })
})
