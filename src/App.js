import React, { useReducer } from 'react'
import './App.css'

import Question from './components/Question'
import { Container, Col, ProgressBar, Button } from 'react-bootstrap'
import { reducer, INITIAL_STATE, ACTION_TYPES } from './reducer'

import questions from './questions.json'

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const {
    questionIndex,
    currentScore,
    maxScore,
    minScore,
    quizFinished
  } = state

  const currentProgress = ((questionIndex + 1) / questions.length) * 100

  const handleAnotherTime = () => dispatch({ type: ACTION_TYPES.ANOTHER_QUIZ })

  return (
    <div>
      <Container fluid>
        <Col xs={12} sm={10} md={8} lg={6} xl={5} className='frame__container'>
          <ProgressBar now={currentProgress} className='progres__bar' />

          {quizFinished ? (
            <div className='finish__container'>
              <p className='finish-text'>
                Quiz finished, your score is : {currentScore.toFixed(2)}
              </p>

              <Button onClick={handleAnotherTime}>Another Time</Button>
            </div>
          ) : (
            <Question state={state} dispatch={dispatch} />
          )}
        </Col>
      </Container>
    </div>
  )
}

export default App
