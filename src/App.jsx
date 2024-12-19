
import * as React from 'react';
import CardComponents from './TodoList'; 
import { TodosContext } from './contexts/TodoContext';
import { v4 as uniId } from 'uuid';
 import './App.css'


 //#6d4c41
 //rgba(219, 163, 163, 0.813)

 const IntialTodos = [
  {
  id: uniId(),
  title:"samar",
  details:"uigdv",
  isCompleted:false
}, 
{
  id: uniId(),
  title:"ahmad",
  details:"uigdv",
  isCompleted:false
}, 
{
  id: uniId(),
  title:"Gazal",
  details:"uigdv",
  isCompleted:false
}

]


 function App() {
   const [todos, setTodos] = React.useState(IntialTodos)
  return (
    <>
    <div>
      <TodosContext.Provider value={{ todos, setTodos }}>
       <CardComponents />
       </TodosContext.Provider>
    </div>
    


    

    </>
  )
}

export default App


