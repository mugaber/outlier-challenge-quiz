import React from 'react'
import './styles.css'
import PropTypes from 'prop-types'
import { ProgressBar } from 'react-bootstrap'

function ScoreProgress ({ minScore, currentScore, maxScore }) {
  return (
    <>
      <div className='score-progress__status'>
        <p>Score: {Math.round(currentScore)}%</p>
        <p>Max Score: {Math.round(maxScore)}%</p>
      </div>

      <ProgressBar className='score-progress__bar'>
        <ProgressBar
          variant={minScore === maxScore ? 'success' : 'danger'}
          now={minScore}
        />
        <ProgressBar variant='success' now={currentScore - minScore} />
        <ProgressBar variant='warning' now={maxScore - currentScore} />
      </ProgressBar>
    </>
  )
}

ScoreProgress.propTypes = {
  minScore: PropTypes.number.isRequired,
  maxScore: PropTypes.number.isRequired,
  currentScore: PropTypes.number.isRequired
}

export default ScoreProgress
