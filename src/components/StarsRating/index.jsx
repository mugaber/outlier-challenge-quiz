import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import StarRatingComponent from 'react-star-rating-component'

function StarsRating ({ difficulty }) {
  const getDifficultyValue = useCallback(() => {
    switch (difficulty) {
      case 'hard': return 3
      case 'medium': return 2
      case 'easy': return 1
      default: return 0
    }
  }, [difficulty])

  return (
    <StarRatingComponent
      name='difficulty'
      starCount={3}
      editing={false}
      value={getDifficultyValue()}
    />
  )
}

StarsRating.propTypes = {
  difficulty: PropTypes.string.isRequired
}

export default StarsRating
