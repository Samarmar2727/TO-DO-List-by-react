import * as React from 'react';
import { createContext } from "react";
import Reducer from '../reducers/TodoReducer'

  export const TodosContext = createContext([])

    const TodosProvider = ({children}) => {
    const [todos, dispatch] = React.useReducer(Reducer, [])
    return (
        <TodosContext.Provider value={{todos, dispatch}}>
            {children}
        </TodosContext.Provider>
    )

 }

 export const useTodo = () => {
  return React.useContext(TodosContext)
 }

 export default TodosProvider;

