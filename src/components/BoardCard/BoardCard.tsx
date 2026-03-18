import { useNavigate } from "react-router-dom";
import type { IBoard } from "../../interfaces/board";

interface BoardCardProps {
  board: IBoard;
  onDelete: () => void;   
  isDeleting: boolean;
  onEdit: () => void;     
}

export const BoardCard = ({ board, onDelete, isDeleting, onEdit }: BoardCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/boards/${board.id}/tasks`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border hover:shadow-lg hover:scale-105 transition flex flex-col justify-between">
      <div onClick={handleClick} className="cursor-pointer">
        <h2 className="text-xl font-bold text-green-700 mb-2">{board.name}</h2>
        <p className="text-gray-600 mb-4">{board.description}</p>
        <div className="text-sm text-gray-400">Author: {board.authorId}</div>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={onEdit}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit
        </button>

        <button
          onClick={onDelete}
          disabled={isDeleting}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
