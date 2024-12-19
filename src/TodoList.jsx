import * as React from 'react';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import TaskBox from './Todo'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { TodosContext } from './contexts/TodoContext';
import { v4 as uniId } from 'uuid';
import './App.css'
import { useEffect } from 'react';




export default function CardComponents(){
  const {todos, setTodos} = React.useContext(TodosContext)
  const [displayedTodoType, setDisplayedTodoType] = React.useState("all")
  const [name, setName] = React.useState('عنوان المهمة');
      const {handleFocus} =() =>{
        setName("")
      }

     
      useEffect(() => {
        const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? []
        setTodos(storageTodos)

      },[])


      const completedTodos = todos.filter((t) => {
        return t.isCompleted
        
      })
      console.log(completedTodos)

      const nonCompletedTodos = todos.filter((t) => {
        return !t.isCompleted;
      })

      console.log(nonCompletedTodos)

      let todosToBeRendering = todos
      console.log(todosToBeRendering)

      if(displayedTodoType == "completed"){
        todosToBeRendering = completedTodos
      }else if(displayedTodoType == "non-completed"){
        todosToBeRendering = nonCompletedTodos
      }else{
        todosToBeRendering = todos
      }

      const todosJsx = todosToBeRendering.map((todo)=> {
        return <TaskBox key={todo.id} todo = {todo}/>
      })



      function displayedChangeType(e){
       setDisplayedTodoType(e.target.value)
       console.log(e.target.value)
       

      }
    



   
      function handleAddClick(){
        const newTodo ={
            id: uniId(),
            title:name,
            details:"",
            isCompleted:false
      
        }

        const updatedTodos = [...todos, newTodo]
        setTodos(updatedTodos)
        localStorage.setItem("todos", JSON.stringify(updatedTodos))
        setName("")

      }

  

   return (
     <>
   <Card className="card" sx={{ maxWidth:500, backgroundColor:"pink", borderRadius:"20px", color:"white", padding:"0 5px" }}
        style={{maxHeight:"90vh", overflowY: "auto" }}>
          
     <h1>مهامي</h1>

     <ToggleButtonGroup
      value={displayedTodoType}
      onChange={displayedChangeType}
    >
      <ToggleButton  value="all" style={{ backgroundColor: displayedTodoType === "all" ?  "pink" : "#6d4c41",
      border:"2px solid whitesmoke",
        borderRadius:"5px", fontSize:"20px", padding:"0 10px", color:"whitesmoke",}}
       >الكل</ToggleButton>
      <ToggleButton value="completed" style={{ backgroundColor: displayedTodoType === "completed" ?  "hsl(60, 63%, 38%)" : "#6d4c41",
        border:"2px solid whitesmoke", borderRadius:"5px", fontSize:"20px", padding:"0 10px", color:"whitesmoke"}} >منجز</ToggleButton>
      <ToggleButton value="non-completed" style={{
        backgroundColor: displayedTodoType === "non-completed" ?  "red" : "#6d4c41",
         border:"2px solid whitesmoke", borderRadius:"5px", fontSize:"20px", padding:"0 10px", color:"whitesmoke"}}>غيرمنجز</ToggleButton>
    </ToggleButtonGroup>

      <div>
      {todosJsx}
      </div>
      
      <div style={{margin:"30px 10px",
       display:"flex", justifyContent:"space-between"}}>
      <TextField sx={{width:"70%"}}
        id="outlined-controlled"
        label="عنوان المهمة"
        value={name}
        onFocus={handleFocus}
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <Button className="add-Button" onClick={()=>{
        handleAddClick()

       }}
       disabled={name.length <= 0}

      style={{ backgroundColor:"#6d4c41" ,fontSize:"25px", padding:"0 20px", color:"whitesmoke", cursor:"pointer"}}>اضافة</Button>
      </div>

 
   </Card>

   </>

 )

}