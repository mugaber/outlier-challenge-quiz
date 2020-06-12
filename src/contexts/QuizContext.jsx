/**
 * to provide <Provider><Quiz /></Provider>, to consume  `useContext(QuizContext)`,
 * using it will over more reusability in the components, however it's not necessary
 * for this app and also it would have made every component that consumes the context
 * to re-render when any element of the state changes, this could be optimized using
 * memoization https://github.com/facebook/react/issues/15156#issuecomment-474590693
 * an easy way that the component can check for props and make a shallow comparison
 * is using React.memo and that will solve it.
 */

import React, { createContext, useReducer } from 'react'
import { INITIAL_STATE, reducer } from '../reducers/quiz.reducer'

const QuizContext = createContext({
  ...INITIAL_STATE,
  dispatch: () => {}
})

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  return (
    <QuizContext.Provider value={{ ...state, dispatch }}>
      {children}
    </QuizContext.Provider>
  )
}

export default QuizContext
