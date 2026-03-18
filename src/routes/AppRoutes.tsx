import { Routes, Route, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { SignIn } from "../pages/SignIn"
import { SignUp } from "../pages/SignUp"
import { ProtectedRoute } from "../protected-route/ProtectedRoute"
import { AuthLayout } from "../Layouts"
import { BoardsLayout } from "../Layouts/BoardsLayout"
import { Boards } from "../pages/Boards/Boards"
import { Tasks } from "../pages/Tasks"
import { TaskDetails } from "../pages/Tasks";

export const AppRoutes = () => {
    return(
    <>
       <Routes>
            <Route path="/" element={<Navigate to="/sign-in" />} />
                
            <Route element={<AuthLayout/>}>  
                <Route path="/sign-in" element={<SignIn/>} />
                <Route path="/sign-up" element={<SignUp/>} />
            </Route> 
            
            <Route element={<ProtectedRoute />}>
                <Route path="/boards" element={<BoardsLayout />}>
                    <Route index element={<Boards />} />
                    <Route path=":boardId/tasks" element={<Tasks />} />
                    <Route path="/boards/:boardId/tasks/:taskId" element={<TaskDetails />} />
                </Route>
            </Route>
       </Routes> 

        <ToastContainer
        aria-label="notification"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>   
    )
}