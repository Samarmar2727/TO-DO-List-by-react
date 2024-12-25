
import Box from '@mui/material/Box';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

 import{useTodo} from "./contexts/TodoContext";
 import { useToast } from './contexts/ToastContext';


export default function TaskBox({todo, showDelete, showUpdate}) {
  const {todos, dispatch} = useTodo()
  const{showHideToast} = useToast()






 function handleUpdateClick() {
 showUpdate(todo)
 
}

 






  function handleDeleteClick() {
    showDelete(todo);
   
  
}




  function handleCheckClick(){
    dispatch({type:"clicked", payload:todo})
    showHideToast("تم التعديل بنجاح")
   
  }
  return (
    <>
    

   
      <Box  className="MuiBox-root" component="section" sx={{  border: '1px solid white', cursor:"pointer" }}>
      <div>
      <h2 style={{marginBottom:"0",textDecoration: todo.isCompleted? "line-through" : "none"}}>{todo.title}</h2>
      <h3 style={{marginTop:"0"}}> {todo.details}</h3>
      </div>
      <div className="icons" >
        <CheckRoundedIcon onClick={()=>{
          handleCheckClick()
          
        }} 
        className="icon" 
        sx={{color: todo.isCompleted ? "white" : "green", 
              border:"2px solid green",
              backgroundColor: todo.isCompleted ? "green" : "white", 
              borderRadius:"50%",
              fontSize:"25px", padding:"2px" }}/>
        <CreateRoundedIcon onClick={handleUpdateClick}  className="icon" sx={{color:"grey", border:"2px solid grey", backgroundColor:"white", borderRadius:"50%", fontSize:"25px", padding:"2px" }}/>
        <DeleteRoundedIcon onClick={handleDeleteClick} className="icon" sx={{color:"red", border:"2px solid red", backgroundColor:"white", borderRadius:"50%", fontSize:"25px", padding:"2px" }}/>
      </div>
    </Box>

    
    </>
   
  );
}