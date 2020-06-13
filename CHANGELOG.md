# CHANGES

## Testing

1. unit tests for shuffleAnswers and calculateNewScore from utils using jest
2. testing the quiz reducer using testing-library/react

## Refactoring

1. made a separate component Quiz and import it to App
2. move stars rating to it's own component
3. move question choices to it's own component
4. pass question object to the Question component instead of using questionIndex
5. move score progress to it's own component
6. new utility function for calculating new score for easy testing
7. use memoization in getDifficultyValue in StarsRating component (useCallback)
8. use Math.round instead of .toFixed(0)
9. a little tweak about the color of the final score in the ScoreProgress bar
10. switched from using Container and Col for the quiz container to normal fixed pixels
11. switched from using Row, Col for the answers to normal div using flex box properties 
12. updating the reducer to have isAnswerCorrect and isAnswerSelected for better component reusability (IMPORTANT)

**opinion** : quiz reducer should take care of more state to make the components only care about\
local state so that they can be more reusable

## Styling 

added some media queries for Quiz and Question components for both tablet and mobile.

## Refactoring with some addition

1. Added Quiz Context and Provider to use state more freely without tight coupling\
   and more reusability (however will not use it)

## NOTE

The app could be made responsive (the quiz container and the question choices) however\
it would've taken time to make it work on all devices and to look good at the same time\
but instead i have focuses on the modularity and the functionality of the app, the app is\
100% using functional programming using hooks and avoiding side effects.