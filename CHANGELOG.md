# CHANGES

## Refactoring

1. made a separate component Quiz and import it to App
2. move stars rating to it's own component
3. move question choices to it's own component
4. pass question object to the Question component instead of using questionIndex
5. move score progress to it's own component
6. new utility function for calculating new score for easy testing
7. use memoization in getDifficultyValue in StarsRating component (useCallback)
8. updating the reducer to have isAnswerCorrect and isAnswerSelected for better component reusability

**opinion** : quiz reducer should take care of more state to make the components only care about\
local state so that they can be more reusable

## Refactoring with some addition

1. Added Quiz Context and Provider to use state more freely without tight coupling and more reusability (however will not use it)
