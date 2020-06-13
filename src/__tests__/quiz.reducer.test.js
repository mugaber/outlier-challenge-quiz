import React, { useReducer } from 'react'
import { render } from '@testing-library/react'
import { INITIAL_STATE, reducer, ACTION_TYPES } from '../reducers/quiz.reducer'

const TestQuizReducer = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const {
    minScore,
    maxScore,
    currentScore,
    questionIndex,
    correctAnswersCount,
    answeredQuestionsCount
  } = state

  return (
    <div>
      {/* BUTTONS */}

      <button
        data-testid='increment-question-index'
        onClick={() =>
          dispatch({ type: ACTION_TYPES.INCREMENT_QUESTION_INDEX })
        }
      />

      <button
        data-testid='correct-answer-button'
        onClick={() =>
          dispatch({ type: ACTION_TYPES.ANSWER_SELECTED, payload: true })
        }
      />

      <button
        data-testid='wrong-answer-button'
        onClick={() =>
          dispatch({ type: ACTION_TYPES.ANSWER_SELECTED, payload: false })
        }
      />

      <button
        data-testid='update-score'
        onClick={() => dispatch({ type: ACTION_TYPES.UPDATE_SCORE })}
      />

      {/* DATA */}

      <span data-testid='question-index'>{questionIndex}</span>

      <span data-testid='correct-answers'>{correctAnswersCount}</span>
      <span data-testid='answered-questions'>{answeredQuestionsCount}</span>

      <span data-testid='current-score'>{currentScore}</span>
      <span data-testid='min-score'>{minScore}</span>
      <span data-testid='max-score'>{maxScore}</span>
    </div>
  )
}

describe('quiz reducer test suit', () => {
  it('increment question index works correctly, quiz finish and another', () => {
    const { getByTestId } = render(<TestQuizReducer />)

    const incrementButton = getByTestId('increment-question-index')
    const questionIndex = getByTestId('question-index')

    incrementButton.click()
    expect(questionIndex.innerHTML).toBe('1')

    incrementButton.click()
    expect(questionIndex.innerHTML).toBe('2')
  })

  it('answer selected works correctly with right and wrong answers and update score', () => {
    const { getByTestId } = render(<TestQuizReducer />)

    const correctAnswerButton = getByTestId('correct-answer-button')
    const wrongAnswerButton = getByTestId('wrong-answer-button')
    const updateScoreButton = getByTestId('update-score')

    const correctAnswersCount = getByTestId('correct-answers')
    const answeredQuestionsCount = getByTestId('answered-questions')

    const currentScore = getByTestId('current-score')
    const minScore = getByTestId('min-score')
    const maxScore = getByTestId('max-score')

    correctAnswerButton.click()
    expect(correctAnswersCount.innerHTML).toBe('1')
    expect(answeredQuestionsCount.innerHTML).toBe('1')

    updateScoreButton.click()
    expect(currentScore.innerHTML).toBe('100')
    expect(minScore.innerHTML).toBe('5')
    expect(maxScore.innerHTML).toBe('100')

    wrongAnswerButton.click()
    expect(correctAnswersCount.innerHTML).toBe('1')
    expect(answeredQuestionsCount.innerHTML).toBe('2')

    updateScoreButton.click()
    expect(currentScore.innerHTML).toBe('50')
    expect(minScore.innerHTML).toBe('5')
    expect(maxScore.innerHTML).toBe('95')
  })
})
