import React, { useReducer } from 'react'
import './styles.css'

import Question from '../Question'
import ScoreProgress from '../ScoreProgress'
import { Container, Col, ProgressBar, Button } from 'react-bootstrap'
import {
  reducer,
  INITIAL_STATE,
  ACTION_TYPES
} from '../../reducers/quiz.reducer'

function Quiz() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const {
    QUESTIONS_LENGTH,
    currentQuestion,
    questionIndex,
    isAnswerSelected,
    isAnswerCorrect,
    currentScore,
    maxScore,
    minScore,
    quizFinished
  } = state

  const currentProgress = ((questionIndex + 1) / QUESTIONS_LENGTH) * 100

  const handleNextClick = () => {
    if (questionIndex === QUESTIONS_LENGTH - 1)
      return dispatch({ type: ACTION_TYPES.FINISH_QUIZ })

    dispatch({ type: ACTION_TYPES.INCREMENT_QUESTION_INDEX })
  }

  const handleAnotherQuiz = () => dispatch({ type: ACTION_TYPES.ANOTHER_QUIZ })

  return (
    <Container fluid>
      <Col xs={12} sm={10} md={8} lg={6} xl={5} className='frame__container'>
        <ProgressBar now={currentProgress} className='progress__bar' />

        {quizFinished ? (
          <div className='finish__container'>
            <p className='finish-text'>
              Quiz finished, your score is : {currentScore.toFixed(0)}%
            </p>

            <Button onClick={handleAnotherQuiz}>Another Time</Button>
          </div>
        ) : (
          <>
            <h3 className='question-number__header'>
              Question {questionIndex + 1} of {QUESTIONS_LENGTH}
            </h3>

            <Question
              dispatch={dispatch}
              question={currentQuestion}
              isAnswerCorrect={isAnswerCorrect}
              isAnswerSelected={isAnswerSelected}
            />

            {isAnswerSelected && (
              <div className='response__container'>
                <p>{isAnswerCorrect ? 'Correct!' : 'Sorry!'}</p>

                <Button
                  className='next-button__container'
                  onClick={handleNextClick}
                >
                  {questionIndex !== QUESTIONS_LENGTH - 1
                    ? 'Next Question'
                    : 'Finish Quiz'}
                </Button>
              </div>
            )}
          </>
        )}

        <div className='score-progress__container'>
          <ScoreProgress
            minScore={minScore}
            maxScore={maxScore}
            currentScore={currentScore}
          />
        </div>
      </Col>
    </Container>
  )
}

export default Quiz
