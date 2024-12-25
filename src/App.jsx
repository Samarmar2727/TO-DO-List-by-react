import * as React from 'react';
import CardComponents from './TodoList'; 
import TodosProvider, { TodosContext } from './contexts/TodoContext';
import { ToastProvider} from "./contexts/ToastContext";
import { v4 as uniId } from 'uuid';
 import './App.css'




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
   //const [todos, setTodos] = React.useState(IntialTodos)
  
 
  return (
    <>
     <TodosProvider>
     <ToastProvider>
      <div>
          <CardComponents />
      </div>
    </ToastProvider>
    </TodosProvider>
   


    

    </>
  )
}

export default App


