import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TaskBox from './Todo'
import Card from '@mui/material/Card';
import{useTodo} from './contexts/TodoContext';
import { useToast} from './contexts/ToastContext';
import './App.css'
import { useEffect } from 'react';





export default function CardComponents(){
  const {todos, dispatch} =useTodo()
  //const [todos, dispatch] = React.useReducer(Reducer, [])
   const{showHideToast} = useToast()
  const [dialogTodo, setDialogTodo] = React.useState(null)
  const [showUpdateDialog, setShowUpdateDialog] = React.useState(false)
  const [ShowDeleteDialog, setShowDeleteDialog] = React.useState(false)
 
  const [displayedTodoType, setDisplayedTodoType] = React.useState("all")
  const [name, setName] = React.useState('عنوان المهمة');

     function handleFocus(){
      setName("")

     }
      useEffect(() => {
        dispatch({type:"get"})
      },[])





      const completedTodos = React.useMemo(()=>{
        console.log("todos calling completed")
        return todos.filter((t) => {
          return t.isCompleted
        })

      }, [todos])
     

      const nonCompletedTodos = React.useMemo(()=>{
        console.log("todos calling non completed")
         return todos.filter((t) => {
          return !t.isCompleted;
        })

      }, [todos])
     

      let todosToBeRendering = todos
      console.log(todosToBeRendering)

      if(displayedTodoType == "completed"){
        todosToBeRendering = completedTodos
      }else if(displayedTodoType == "non-completed"){
        todosToBeRendering = nonCompletedTodos
      }else{
        todosToBeRendering = todos
      }

     


      function displayedChangeType(e){
       setDisplayedTodoType(e.target.value)
       console.log(e.target.value)
       

      }
    



   
      function handleAddClick(){

        dispatch ({type:"added", payload:{
          NewTitle:name
        }})

        setName("")
        showHideToast("تم اضافة المهمة بنجاح")

      }

      function openUpdateDialog(todo){
        setDialogTodo(todo)
        setShowUpdateDialog(true)

      }


     
      function handleUpdateDialogClose(){
      setShowUpdateDialog(false)
    
     }


     function handleUpdateConfirm(){
      dispatch({type:"updated", payload:dialogTodo})
      setShowUpdateDialog(false)
      showHideToast("تم التحديث بنجاح")
    
     
    
     }

      
 function openDeleteDialog(todo){
  setDialogTodo(todo)
  setShowDeleteDialog(true)
  
 }

      function handleDeleteDialogClose() {
        setShowDeleteDialog(false)
       
      }

      function handleDeleteConfirm(){
       dispatch({type:"deleted", payload:dialogTodo})
        setShowDeleteDialog(false)
        showHideToast("تم حذف المهمة بنجاح")
      }

      const todosJsx = todosToBeRendering.map((todo)=> {
        return <TaskBox key={todo.id} todo = {todo} showDelete ={openDeleteDialog} showUpdate={openUpdateDialog}/>
      })


  

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
            value={dialogTodo?.title || ''}
            onChange={(e)=>{
              setDialogTodo({ ...dialogTodo,  title: e.target.value} )
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
            value={dialogTodo?.details || ''}
            onChange={(e)=>{
              setDialogTodo({ ...dialogTodo,  details: e.target.value} )
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDialogClose}>اغلاق</Button>
          <Button onClick={handleUpdateConfirm}>تأكيد </Button>
        </DialogActions>
      </Dialog>
    {/*====update Dialog=======*/ }
     
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
        {/*====delete Dialog=======*/ }




      <Container maxWidth="sm">

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
      </Container>

  

   </>

 )

}