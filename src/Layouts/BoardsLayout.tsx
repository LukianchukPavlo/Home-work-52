import { Outlet, useParams } from "react-router-dom"

import { LogoutButton } from "../components/Button/LogoutButton"
import { useCreateTaskMutation } from "../app/store/api/tasks";
import { useCreateBoardMutation } from "../app/store/api/boards";
import { toast } from "react-toastify";
import { WorkflowCode } from "../interfaces";

export const BoardsLayout = () => {
  const { boardId } = useParams();
  
  const [createTask, { isLoading: isCreating }] = useCreateTaskMutation();
  const [createBoard, { isLoading: isCreatingBoard }] = useCreateBoardMutation();

  const handleCreateTask = async (boardId: string) => {
    try {
      await createTask({
        boardId,
        title: "New Task",
        description: "Task description",
        workflow: WorkflowCode.TODO,
      }).unwrap();
      toast.success("Task created successfully!");
    } catch (err) {
      toast.error("Failed to create task");
    }
  };

  const handleCreateBoard = async () => {
    try {
      await createBoard({
        name: "My New Project Board",
        description: "Tasks for the new project",
      }).unwrap();
      toast.success("Board created successfully!");
    } catch (err) {
      toast.error("Failed to create board");
    }
  };
    
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-100"> 
        <header className="flex items-center justify-between bg-green-50 h-24 w-full shadow-md px-10">
          <h1 className="text-3xl font-bold text-green-700">Task Manager</h1>
          {boardId ? (
          <button
            onClick={() => handleCreateTask(boardId)}   
            disabled={isCreating}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50"
          >
            + New Task
          </button>
          ) : (
            <button
            onClick={handleCreateBoard}
            disabled={isCreatingBoard}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-green-700 transition disabled:opacity-50"
          >
            + Create Board
          </button>
          )}
          <LogoutButton/>
      </header>
        
        <main className="flex flex-1 p-6">
            <div className="flex flex-1 p-6">
                <Outlet/>
            </div>
        </main>
        
        <footer className="flex items-center  h-16 bg-green-50 text-gray-600 text-sm border-t"> 
            <h4 className="ml-10"> Task Manager. Lukianchuk Pavlo </h4>
        </footer>
    </div>
    )
}