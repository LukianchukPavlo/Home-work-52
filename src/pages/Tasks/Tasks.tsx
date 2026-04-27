import { Link, useParams } from "react-router-dom";
import {
  useGetTasksQuery,
  useUpdateTaskWorkflowMutation,
  useDeleteTaskMutation,
} from "../../app/store/api/tasks";
import { WorkflowCode, type ITask } from "../../interfaces";
import { toast } from "react-toastify";
import { useMemo, useState } from "react";

export const Tasks = () => {
  const { boardId } = useParams();

  const {
    data: tasks = [],
    isLoading,
    error,
  } = useGetTasksQuery(boardId ?? "", {
    skip: !boardId,
  });

  const [updateTaskWorkflow] = useUpdateTaskWorkflowMutation();
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();

  const [confirmTaskId, setConfirmTaskId] = useState<string | null>(null);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const workflowOrder = [
    WorkflowCode.TODO,
    WorkflowCode.PROGRESS,
    WorkflowCode.DONE,
  ];

  const getWorkflowCode = (task: ITask): WorkflowCode => {
    if (!task.workflow || typeof task.workflow !== "object") {
      return WorkflowCode.TODO;
    }

    if (typeof task.workflow === "string") {
      return task.workflow as WorkflowCode;
    }

    return task.workflow.code;
  };

  

  const handleMoveTask = async (
    id: string,
    current: WorkflowCode,
    direction: "left" | "right"
  ) => {
    const index = workflowOrder.indexOf(current);

    let newCode = current;

    if (direction === "left" && index > 0) {
      newCode = workflowOrder[index - 1];
    }

    if (direction === "right" && index < workflowOrder.length - 1) {
      newCode = workflowOrder[index + 1];
    }

    try {
      setActiveTaskId(id);

      await updateTaskWorkflow({
        taskId: id,
        workflow: newCode,
      }).unwrap();
    } catch (err) {
      toast.error("Failed to update task");
      console.error(err);
    } finally {
      setActiveTaskId(null);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id).unwrap();
      toast.success("Task deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete task");
    } finally {
      setConfirmTaskId(null);
    }
  };

  const grouped = useMemo(() => {
    if (!Array.isArray(tasks)) {
      return {
        TODO: [],
        PROGRESS: [],
        DONE: [],
      };
    }

    return tasks.reduce(
      (acc, task) => {
        const code = getWorkflowCode(task);

        if (code === WorkflowCode.TODO) acc.TODO.push(task);
        else if (code === WorkflowCode.PROGRESS) acc.PROGRESS.push(task);
        else acc.DONE.push(task);

        return acc;
      },
      {
        TODO: [] as ITask[],
        PROGRESS: [] as ITask[],
        DONE: [] as ITask[],
      }
    );
  }, [tasks]);

  const renderTask = (task: ITask) => {
    const code = getWorkflowCode(task);
    const isActive = activeTaskId === task.id;

    return (
      <div
        key={task.id}
        className="bg-white rounded-md shadow p-3 mb-3 h-32 flex flex-col justify-between"
      >
        <Link to={`/boards/${boardId}/tasks/${task.id}`}>
          <h3 className="font-medium text-gray-800 hover:underline">
            {task.title}
          </h3>
        </Link>

        <p className="text-sm text-gray-600 line-clamp-2">
          {task.description}
        </p>

        <div className="flex justify-between mt-2">
          <button
            onClick={() => handleMoveTask(task.id, code, "left")}
            disabled={code === WorkflowCode.TODO || isActive}
            className="px-2 py-1 rounded bg-gray-600 text-white hover:bg-gray-700 disabled:opacity-50"
          >
            ←
          </button>

          <button
            onClick={() => setConfirmTaskId(task.id)}
            disabled={isDeleting}
            className="px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
          >
            ✕
          </button>

          <button
            onClick={() => handleMoveTask(task.id, code, "right")}
            disabled={code === WorkflowCode.DONE || isActive}
            className="px-2 py-1 rounded bg-gray-600 text-white hover:bg-gray-700 disabled:opacity-50"
          >
            →
          </button>
        </div>
      </div>
    );
  };



  if (!boardId) return <p>No board selected</p>;
  if (isLoading) return <p>Loading tasks...</p>;
  if (error) return <p>Error loading tasks</p>;

  return (
    <>
      <div className="flex gap-6 p-6">
        {/* TODO */}
        <div className="flex-1 bg-gray-100 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            To Do
          </h2>

          {grouped.TODO.length ? (
            grouped.TODO.map(renderTask)
          ) : (
            <p className="text-gray-400 text-center">No tasks</p>
          )}
        </div>

        {/* PROGRESS */}
        <div className="flex-1 bg-blue-100 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-700">
            In Progress
          </h2>

          {grouped.PROGRESS.length ? (
            grouped.PROGRESS.map(renderTask)
          ) : (
            <p className="text-gray-400 text-center">No tasks</p>
          )}
        </div>

        {/* DONE */}
        <div className="flex-1 bg-green-100 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4 text-green-700">
            Done
          </h2>

          {grouped.DONE.length ? (
            grouped.DONE.map(renderTask)
          ) : (
            <p className="text-gray-400 text-center">No tasks</p>
          )}
        </div>
      </div>

      {/* MODAL */}
      {confirmTaskId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>

            <p className="text-gray-600 mb-6">
              Do you really want to delete this task?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmTaskId(null)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                No
              </button>

              <button
                onClick={() => handleDeleteTask(confirmTaskId)}
                disabled={isDeleting}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};