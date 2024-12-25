import { v4 as uniId } from 'uuid';


export default function Reducer (currentState, action){
    switch (action.type) {
            case "added": {
            const newTodo ={
                id: uniId(),
                title:action.payload.NewTitle,
                details:"",
                isCompleted:false
          
            }
    
            const updatedTodos = [...currentState, newTodo]

            localStorage.setItem("todos", JSON.stringify(updatedTodos))
            return updatedTodos
        }

        case "clicked":{
          const updatedTodos = currentState.map((t) => {
            if (t.id == action.payload.id) {
              return { ...t, isCompleted: !t.isCompleted }  
      
            }
      
            return t
      
          });
          localStorage.setItem("todos", JSON.stringify(updatedTodos))
          return  updatedTodos;

        }
           case "deleted":{
            const updatedTodos = currentState.filter((t) => {
                if(t.id == action.payload.id){
                  return false
                }else {
                  return true
                }
                //return t.id != action.payload.id
            
              })
            
              localStorage.setItem("todos", JSON.stringify(updatedTodos))
              return updatedTodos;
             
            }

            case "updated": {
                const updatedTodos = currentState.map((t) => {
                    if(t.id == action.payload.id){
                      return ({...t, title: action.payload.title, details: action.payload.details})
                    } else{
                      return t
                    }
                  })
                  localStorage.setItem("todos", JSON.stringify(updatedTodos))
                  return updatedTodos;
                
    
                
    
            }

            case"get": {
                const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
                return storageTodos
    
            }
            
            default :{
            throw Error("unknown action" + action.type);
            
            }

        
    }

    return []   
     
    }
   




