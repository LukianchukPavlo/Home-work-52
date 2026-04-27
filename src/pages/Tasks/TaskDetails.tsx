import { useParams } from "react-router-dom";
import {
  useGetTaskQuery,
  useUpdateTaskMutation,
} from "../../app/store/api/tasks";
import { useEffect, useState } from "react";

export const TaskDetails = () => {
  const { taskId } = useParams();

  const { data: task, isLoading } = useGetTaskQuery(taskId!);
  const [updateTask] = useUpdateTaskMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  if (isLoading) return <p>Loading...</p>;
  if (!task) return <p>Task not found</p>;

  const handleSave = async () => {
    try {
      await updateTask({
        taskId: task.id,
        body: { title, description },
      }).unwrap();

      setIsEditing(false);
    } catch {
      console.error("Update failed");
    }
  };

  return (
    <div className="p-6">
      {isEditing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <h2>{task.title}</h2>
          <p>{task.description}</p>

          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
    </div>
  );
};