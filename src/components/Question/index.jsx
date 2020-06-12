import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './styles.css'

import { Container, Row, Col, Button } from 'react-bootstrap'
import StarRatingComponent from 'react-star-rating-component'

import { ACTION_TYPES } from '../../reducer'
import questions from '../../questions.json'
import { shuffleAnswers } from '../../utils'

const questionsLength = questions.length

function Question({ state, dispatch }) {
  const { questionIndex } = state

  const currentQuestion = questions[questionIndex]

  // QUESTION CHOICES

  const [questionChoices, setQuestionChoices] = useState([])

  useEffect(() => {
    setQuestionChoices(
      shuffleAnswers([
        currentQuestion.correct_answer,
        ...currentQuestion.incorrect_answers
      ])
    )
  }, [questionIndex])

  // SELECT ANSWER

  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null)

  const [answerSelected, setAnswerSelected] = useState(false)
  const [answerCorrect, setAnswerCorrect] = useState(false)

  const handleSelectAnswer = (value, index) => {
    setAnswerSelected(true)
    setSelectedButtonIndex(index)

    if (value === currentQuestion.correct_answer) {
      setAnswerCorrect(true)
      dispatch({ type: ACTION_TYPES.INCREMENT_CORRECT_ANSWERS })
    }

    dispatch({ type: ACTION_TYPES.INCREMENT_ANSWERED_QUESTIONS })
    dispatch({ type: ACTION_TYPES.UPDATE_SCORE })
  }

  // NEXT BUTTON

  const handleNextClick = () => {
    if (questionIndex === questionsLength - 1) {
      return dispatch({ type: ACTION_TYPES.FINISH_QUIZ })
    }

    setAnswerSelected(false)
    setAnswerCorrect(false)
    setSelectedButtonIndex(null)

    dispatch({ type: ACTION_TYPES.INCREMENT_QUESTION_INDEX })
  }

  // DIFFICULTY LEVEL

  const getDifficultyValue = () => {
    const difficultyLevel = currentQuestion.difficulty

    return difficultyLevel === 'hard'
      ? 3
      : difficultyLevel === 'medium'
      ? 2
      : difficultyLevel === 'easy'
      ? 1
      : 0
  }

  // BUTTON VAIRANT

  const getButtonVariant = (value, index) =>
    answerSelected && value === currentQuestion.correct_answer
      ? 'success'
      : !answerCorrect && selectedButtonIndex === index
      ? 'danger'
      : answerSelected
      ? 'secondary'
      : 'primary'

  // FUNCTION RETURN

  if (questionIndex === questionsLength) return null

  return (
    <div className='question__container'>
      <h3>
        Question {questionIndex + 1} of {questionsLength}
      </h3>

      <p className='question-category'>
        {decodeURIComponent(currentQuestion.category)}
      </p>

      <div className='stars__container'>
        <StarRatingComponent
          name='difficulty'
          starCount={3}
          editing={false}
          value={getDifficultyValue()}
        />

        <h5 className='question-text'>
          {decodeURIComponent(currentQuestion.question)}
        </h5>

        <Container>
          <Row xs={1} sm={2}>
            {questionChoices.map((value, index) => (
              <Col
                key={index}
                className='answer__container'
                sm={{ span: 5, offset: index % 2 !== 0 ? 2 : 0 }}
              >
                <Button
                  block
                  disabled={answerSelected}
                  onClick={() => handleSelectAnswer(value, index)}
                  variant={getButtonVariant(value, index)}
                >
                  {decodeURIComponent(value)}
                </Button>
              </Col>
            ))}
          </Row>
        </Container>

        {answerSelected && (
          <div className='response__container'>
            <p>{answerCorrect ? 'Correct!' : 'Sorry!'}</p>

            <Button
              className='next-button__container'
              onClick={handleNextClick}
            >
              {questionIndex !== questionsLength - 1
                ? 'Next Question'
                : 'Finish Quiz'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

Question.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default Question
