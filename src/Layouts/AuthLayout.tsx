
import { Button } from "../components/Button";
import { Outlet } from "react-router-dom"

export const AuthLayout = () => {
    

    return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-100"> 
        <header className="flex text-green-700 font-bold bg-green-50 h-24 w-full shadow-md">
            <h1 className="text-3xl ml-10 pt-8">Task Manager</h1>
            <Button/>
        </header>
        
        <main className="flex flex-1 items-center justify-center p-6">
            <div>
                <Outlet/>
            </div>
        </main>
        
        <footer className="flex items-center  h-16 bg-green-50 text-gray-600 text-sm border-t"> 
            <h4 className="ml-10"> Task Manager. Lukianchuk Pavlo </h4>
        </footer>
    </div>
    )
}