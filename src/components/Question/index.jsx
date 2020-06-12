import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './styles.css'

import { shuffleAnswers } from '../../utils'
import { ACTION_TYPES } from '../../reducers/quiz.reducer'

import StarsRating from '../StarsRating'
import { Container, Row, Col, Button } from 'react-bootstrap'

function Question({ dispatch, question, isAnswerSelected, isAnswerCorrect }) {
  // QUESTION CHOICES

  const [questionChoices, setQuestionChoices] = useState([])

  useEffect(() => {
    setQuestionChoices(
      shuffleAnswers([question.correct_answer, ...question.incorrect_answers])
    )
  }, [question])

  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null)

  const handleSelectAnswer = (value, index) => {
    setSelectedButtonIndex(index)

    const isAnswerCorrect = value === question.correct_answer ? true : false

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
                disabled={isAnswerSelected}
                variant={getButtonVariant(value, index)}
                onClick={() => handleSelectAnswer(value, index)}
              >
                {decodeURIComponent(value)}
              </Button>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

Question.propTypes = {
  dispatch: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
  isAnswerSelected: PropTypes.bool.isRequired
}

export default Question
