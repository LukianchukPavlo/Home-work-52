import { useParams } from "react-router-dom";
import { useGetTasksQuery, useUpdateTaskContentMutation } from "../../app/store/api/tasks";
import { type ITask } from "../../interfaces";
import { useState } from "react";
import { toast } from "react-toastify";

export const TaskDetails = () => {
  const { boardId, taskId } = useParams();
  const { data: tasks = [], isLoading } = useGetTasksQuery(boardId!);
  const [updateTaskContent, { isLoading: isUpdating }] = useUpdateTaskContentMutation();

  const task: ITask | undefined = tasks.find((t) => t.id === taskId);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");

  if (isLoading) return <p>Loading task...</p>;
  if (!task) return <p className="text-center text-gray-500">Task not found</p>;

  const handleSave = async () => {
    try {
      await updateTaskContent({
        taskId: task.id,
        body: { title, description },
      }).unwrap();
      toast.success("Task updated successfully!");
      setIsEditing(false);
    } catch (err) {
      toast.error("Failed to update task");
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto">
      {isEditing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full mb-4 rounded"
            placeholder="Task title"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full mb-4 rounded"
            placeholder="Task description"
          />
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={isUpdating}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
          <p className="text-gray-700 mb-4">{task.description}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
};

