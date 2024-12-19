import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
 import { TodosContext } from './contexts/TodoContext';
import React from 'react';


export default function TaskBox({todo}) {

  const {todos, setTodos} = React.useContext(TodosContext)
 const [showUpdateDialog, setShowUpdateDialog] = React.useState(false)
 const [updateTodos, setUpadteTodos] = React.useState({title:todo.title, details:todo.details})
 const [ShowDeleteDialog, setShowDeleteDialog] = React.useState(false)



  function handleUpdateClick() {
    setShowUpdateDialog(true)
   
 }
 function handleUpdateDialogClose(){
  setShowUpdateDialog(false)

 }

 function handleUpdateConfirm(){
  const updatedTodos = todos.map((t) => {
    if(t.id == todo.id){
      return ({...t, title: updateTodos.title, details: updateTodos.details})
    } else{
      return t
    }
  })

  setTodos(updatedTodos)

  localStorage.setItem("todos", JSON.stringify(updatedTodos))
  setShowUpdateDialog(false)

 

 }




  function handleDeleteClick() {
    setShowDeleteDialog(true)
  
}

function handleDeleteDialogClose() {
  setShowDeleteDialog(false)
 
}

function handleDeleteConfirm(){
  const updatedTodos = todos.filter((t) => {
    if(t.id == todo.id){
      return false
    }else {
      return true
    }
    //return t.id != todo.id

  })

  setTodos(updatedTodos)
  localStorage.setItem("todos", JSON.stringify(updatedTodos))
}

  function handleCheckClick(){
    const updatedTodos = todos.map((t) => {
      if (t.id == todo.id) {

        return { ...t, isCompleted: !t.isCompleted }  

      }

      return t

    });

    setTodos(updatedTodos)
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
   
  }
  return (
    <>
    {/*update Dialog*/ }
    <Dialog
        open={showUpdateDialog}
        onClose={handleUpdateDialogClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleUpdateDialogClose();
          },
        }}
      >
        <DialogTitle>تعديل مهمة </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
            value={updateTodos.title}
            onChange={(e)=>{
              setUpadteTodos({ ...updateTodos,  title: e.target.value} )
            }}
          />

       <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="التفاصيل"
            fullWidth
            variant="standard"
            value={updateTodos.details}
            onChange={(e)=>{
              setUpadteTodos({ ...updateTodos,  details: e.target.value} )
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDialogClose}>اغلاق</Button>
          <Button onClick={handleUpdateConfirm}>تأكيد </Button>
        </DialogActions>
      </Dialog>
      {/*====delete Dialog=======*/ }

   {/*delete Dialog*/ }
     <Dialog
     onClose={handleDeleteDialogClose}
        open={ShowDeleteDialog}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{" هل أنت متأكد من حذف هذه المهمة ؟"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          لا يمكنك التراجع عن الحذف بعد اتمامه 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirm}>نعم، بالتأكيد </Button>
          <Button onClick={handleDeleteDialogClose}>اغلاق</Button>
        </DialogActions>
      </Dialog>
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