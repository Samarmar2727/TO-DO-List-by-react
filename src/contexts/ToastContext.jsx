import * as React from 'react';
import MySnackBar from '../MySnackBar'
import { createContext } from "react";


const ToastContext = createContext([])
export const ToastProvider = ({children})=> {
    const [open, setOpen] = React.useState(false);
    const [message, setmessage] = React.useState("");

        function showHideToast(message){
    setmessage(message)
    setOpen(true)
    setTimeout(() => {
      setOpen(false)

    },2000)

   }


    return (
        <ToastContext.Provider value={{showHideToast}}>
            <MySnackBar open={open} message={message}/>
            {children}
        </ToastContext.Provider>


    )

   }

   export const useToast = () => {
    return React.useContext(ToastContext)

   }