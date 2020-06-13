import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './styles.css'

import StarsRating from '../StarsRating'
import { Button } from 'react-bootstrap'

import { shuffleAnswers } from '../../utils'
import { ACTION_TYPES } from '../../reducers/quiz.reducer'

function Question ({ dispatch, question, isAnswerSelected, isAnswerCorrect }) {
  // QUESTION CHOICES

  const [questionChoices, setQuestionChoices] = useState([])

  useEffect(() => {
    setQuestionChoices(
      shuffleAnswers([question.correct_answer, ...question.incorrect_answers])
    )
  }, [question])

  // SELECT ANSWER HANDLER

  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null)

  const handleSelectAnswer = (value, index) => {
    setSelectedButtonIndex(index)

    const isAnswerCorrect = value === question.correct_answer

    dispatch({ type: ACTION_TYPES.ANSWER_SELECTED, payload: isAnswerCorrect })
    dispatch({ type: ACTION_TYPES.UPDATE_SCORE })
  }

  // ANSWER BUTTON VARIANT

  const getButtonVariant = (value, index) => {
    if (!isAnswerSelected) return 'primary'

    if (value === question.correct_answer) return 'success'

    if (!isAnswerCorrect && selectedButtonIndex === index) return 'danger'

    if (isAnswerSelected) return 'secondary'
  }

  return (
    <div className='question__container'>
      <p className='question-category'>
        {decodeURIComponent(question.category)}
      </p>

      <div className='stars__container'>
        <StarsRating difficulty={question.difficulty} />
      </div>

      <h5 className='question-text'>{decodeURIComponent(question.question)}</h5>

      <div className='answers__container'>
        {questionChoices.map((value, index) => (
          <Button
            key={value}
            className='answer-button'
            disabled={isAnswerSelected}
            variant={getButtonVariant(value, index)}
            onClick={() => handleSelectAnswer(value, index)}
          >
            {decodeURIComponent(value)}
          </Button>
        ))}
      </div>
    </div>
  )
}

Question.propTypes = {
  dispatch: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
  isAnswerSelected: PropTypes.bool.isRequired
}

export default Question
